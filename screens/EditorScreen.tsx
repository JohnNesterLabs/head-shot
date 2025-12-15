import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const EditorScreen: React.FC = () => {
    const navigate = useNavigate();
    const { uploadedImage, setUploadedImage, addToGallery } = useAppContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);
    const [filter, setFilter] = useState('none');
    const [aspectRatio, setAspectRatio] = useState('4:5'); // Default portrait
    const [isProcessing, setIsProcessing] = useState(false);

    // If no image, go back
    useEffect(() => {
        if (!uploadedImage) navigate('/upload');
    }, [uploadedImage, navigate]);

    const filters = [
        { name: 'None', value: 'none', icon: 'block' },
        { name: 'B&W', value: 'grayscale(100%)', icon: 'filter_b_and_w' },
        { name: 'Sepia', value: 'sepia(100%)', icon: 'filter_vintage' },
        { name: 'Warm', value: 'sepia(50%) contrast(110%)', icon: 'wb_sunny' },
    ];

    const rotateLeft = () => setRotation(prev => (prev - 90));
    const rotateRight = () => setRotation(prev => (prev + 90));

    const saveEdits = async () => {
        setIsProcessing(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = uploadedImage!;
        
        await img.decode();

        // Calculate dimensions based on rotation
        // Normalize rotation to 0-360
        const normRotation = ((rotation % 360) + 360) % 360;
        const isRotatedSideways = normRotation === 90 || normRotation === 270;

        const srcWidth = isRotatedSideways ? img.height : img.width;
        const srcHeight = isRotatedSideways ? img.width : img.height;

        // Apply aspect ratio crop (Center Crop)
        let targetWidth = srcWidth;
        let targetHeight = srcHeight;
        
        if (aspectRatio === '1:1') {
            const min = Math.min(srcWidth, srcHeight);
            targetWidth = min;
            targetHeight = min;
        } else if (aspectRatio === '4:5') {
            // Portrait
            if (srcWidth / srcHeight > 4/5) {
                targetHeight = srcHeight;
                targetWidth = srcHeight * (4/5);
            } else {
                targetWidth = srcWidth;
                targetHeight = srcWidth * (5/4);
            }
        }

        // Set canvas size to target crop size
        // We limit max resolution to prevent massive base64 strings
        const MAX_DIM = 1200;
        const scale = Math.min(1, MAX_DIM / Math.max(targetWidth, targetHeight));
        
        canvas.width = targetWidth * scale;
        canvas.height = targetHeight * scale;

        if (ctx) {
            // Fill background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Setup transformations
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.scale(scale, scale);
            
            // Apply filter
            ctx.filter = filter;

            // Draw image centered
            ctx.drawImage(img, -img.width / 2, -img.height / 2);

            const finalImage = canvas.toDataURL('image/jpeg', 0.9);
            
            // Save to context and gallery
            setUploadedImage(finalImage);
            addToGallery(finalImage);
            
            setIsProcessing(false);
            navigate('/style');
        }
    };

    // Style for preview
    const previewStyle = {
        transform: `rotate(${rotation}deg)`,
        filter: filter,
        transition: 'all 0.3s ease'
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-dark animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 z-10 bg-background-dark/80 backdrop-blur-md">
                <button onClick={() => navigate('/upload')} className="text-white flex items-center gap-1">
                    <span className="material-symbols-outlined">close</span>
                    <span className="text-sm font-medium">Cancel</span>
                </button>
                <h2 className="text-white text-base font-bold">Edit Photo</h2>
                <button 
                    onClick={saveEdits}
                    disabled={isProcessing}
                    className="text-primary font-bold text-sm bg-white rounded-full px-4 py-1.5 hover:bg-slate-100 disabled:opacity-50"
                >
                    {isProcessing ? 'Saving...' : 'Done'}
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden p-8">
                {/* Visual Guide Overlay for Aspect Ratio */}
                <div className={`relative transition-all duration-300 shadow-2xl ${
                    aspectRatio === '1:1' ? 'aspect-square w-full max-w-[300px]' : 
                    aspectRatio === '4:5' ? 'aspect-[4/5] h-full max-h-[400px]' : 'w-full h-full object-contain'
                } border border-white/20 overflow-hidden`}>
                     {uploadedImage && (
                        <img 
                            src={uploadedImage} 
                            alt="Preview" 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
                            style={previewStyle}
                        />
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="bg-[#1E2235] pb-safe pt-2">
                {/* Tools Selection */}
                <div className="flex flex-col gap-4 p-4">
                    {/* Rotate */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Rotate</span>
                        <div className="flex gap-4">
                            <button onClick={rotateLeft} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white">
                                <span className="material-symbols-outlined text-[20px]">rotate_left</span>
                            </button>
                            <button onClick={rotateRight} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white">
                                <span className="material-symbols-outlined text-[20px]">rotate_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Crop</span>
                        <div className="flex gap-2">
                            {['Original', '1:1', '4:5'].map(r => (
                                <button 
                                    key={r}
                                    onClick={() => setAspectRatio(r)}
                                    className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                                        aspectRatio === r 
                                        ? 'bg-primary border-primary text-white' 
                                        : 'border-white/20 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2 block">Filters</span>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            {filters.map(f => (
                                <button 
                                    key={f.name}
                                    onClick={() => setFilter(f.value)}
                                    className={`flex flex-col items-center gap-1 min-w-[60px] ${filter === f.value ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center border-2 ${filter === f.value ? 'border-primary' : 'border-transparent'}`}>
                                        <span className="material-symbols-outlined text-white">{f.icon}</span>
                                    </div>
                                    <span className="text-[10px] text-white font-medium">{f.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorScreen;