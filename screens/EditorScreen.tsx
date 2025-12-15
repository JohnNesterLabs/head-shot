import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const EditorScreen: React.FC = () => {
    const navigate = useNavigate();
    const { uploadedImage, setUploadedImage, addToGallery } = useAppContext();
    const [rotation, setRotation] = useState(0);
    const [filter, setFilter] = useState('none');
    const [aspectRatio, setAspectRatio] = useState('Original'); 
    const [isProcessing, setIsProcessing] = useState(false);
    const [imgSize, setImgSize] = useState<{w: number, h: number} | null>(null);

    // If no image, go back
    useEffect(() => {
        if (!uploadedImage) navigate('/upload');
    }, [uploadedImage, navigate]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setImgSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
    };

    const filters = [
        { name: 'None', value: 'none', icon: 'block' },
        { name: 'B&W', value: 'grayscale(100%)', icon: 'filter_b_and_w' },
        { name: 'Sepia', value: 'sepia(100%)', icon: 'filter_vintage' },
        { name: 'Warm', value: 'sepia(50%) contrast(110%)', icon: 'wb_sunny' },
    ];

    const rotateLeft = () => setRotation(prev => (prev - 90));
    const rotateRight = () => setRotation(prev => (prev + 90));

    const saveEdits = async () => {
        if (!uploadedImage) return;
        setIsProcessing(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = uploadedImage;
        
        await img.decode();

        // Normalize rotation to 0-360
        const normRotation = ((rotation % 360) + 360) % 360;
        const isSideways = normRotation === 90 || normRotation === 270;

        const srcWidth = isSideways ? img.height : img.width;
        const srcHeight = isSideways ? img.width : img.height;

        // Apply aspect ratio crop (Center Crop)
        let targetWidth = srcWidth;
        let targetHeight = srcHeight;
        
        if (aspectRatio === '1:1') {
            const min = Math.min(srcWidth, srcHeight);
            targetWidth = min;
            targetHeight = min;
        } else if (aspectRatio === '4:5') {
            // Portrait logic: fit shortest side
            if (srcWidth / srcHeight > 4/5) {
                targetHeight = srcHeight;
                targetWidth = srcHeight * (4/5);
            } else {
                targetWidth = srcWidth;
                targetHeight = srcWidth * (5/4);
            }
        }

        // Limit max resolution
        const MAX_DIM = 1200;
        const scale = Math.min(1, MAX_DIM / Math.max(targetWidth, targetHeight));
        
        canvas.width = targetWidth * scale;
        canvas.height = targetHeight * scale;

        if (ctx) {
            // Fill background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Center and Rotate
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.scale(scale, scale);
            ctx.filter = filter;

            // Draw image centered
            ctx.drawImage(img, -img.width / 2, -img.height / 2);

            const finalImage = canvas.toDataURL('image/jpeg', 0.9);
            
            // Save
            setUploadedImage(finalImage);
            addToGallery(finalImage);
            
            setIsProcessing(false);
            navigate('/style');
        }
    };

    // Calculate Container Style for Preview
    const getContainerStyle = (): React.CSSProperties => {
        const common: React.CSSProperties = {
            maxWidth: '100%',
            maxHeight: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
        };

        if (aspectRatio === 'Original') {
            return {
                ...common,
                width: 'auto',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            };
        }

        // For Crop Modes, we force the aspect ratio and try to fill the available space
        return {
            ...common,
            aspectRatio: aspectRatio.replace(':', '/'),
            width: '1000px', // Force large to hit max-width/height constraints
            height: '1000px', // Force large to hit max-width/height constraints
            position: 'relative',
        };
    };

    // Calculate Image Style for Preview
    const getImageStyle = (): React.CSSProperties => {
        const transform = `rotate(${rotation}deg)`;
        
        if (aspectRatio === 'Original') {
            return {
                transform,
                filter: filter,
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block',
                transition: 'all 0.3s ease',
            };
        }

        // Crop Mode: Cover
        return {
            transform,
            filter: filter,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures image fills the aspect-ratio box
            transition: 'all 0.3s ease',
        };
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-dark animate-fade-in">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 z-10 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
                <button onClick={() => navigate('/upload')} className="text-white flex items-center gap-1 hover:text-slate-300 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                    <span className="text-sm font-medium">Cancel</span>
                </button>
                <h2 className="text-white text-base font-bold">Edit Photo</h2>
                <button 
                    onClick={saveEdits}
                    disabled={isProcessing}
                    className="text-primary font-bold text-sm bg-white rounded-full px-4 py-1.5 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                >
                    {isProcessing ? 'Saving...' : 'Done'}
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden p-6 w-full">
                 <div style={getContainerStyle()}>
                     {uploadedImage && (
                        <img 
                            src={uploadedImage} 
                            onLoad={handleImageLoad}
                            alt="Preview" 
                            style={getImageStyle()}
                        />
                    )}
                 </div>
            </div>

            {/* Controls */}
            <div className="bg-[#1E2235] pb-safe pt-2 border-t border-white/5">
                <div className="flex flex-col gap-5 p-5">
                    
                    {/* Rotate */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Rotate</span>
                        <div className="flex gap-3">
                            <button onClick={rotateLeft} className="size-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors">
                                <span className="material-symbols-outlined text-[20px]">rotate_left</span>
                            </button>
                            <button onClick={rotateRight} className="size-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors">
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
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                        aspectRatio === r 
                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                                        : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-3 block">Filters</span>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                            {filters.map(f => (
                                <button 
                                    key={f.name}
                                    onClick={() => setFilter(f.value)}
                                    className={`flex flex-col items-center gap-2 min-w-[64px] group`}
                                >
                                    <div className={`size-14 rounded-xl bg-slate-800 flex items-center justify-center border-2 transition-all ${filter === f.value ? 'border-primary shadow-[0_0_0_2px_rgba(19,55,236,0.3)]' : 'border-white/5 group-hover:border-white/20'}`}>
                                        <span className={`material-symbols-outlined ${filter === f.value ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`}>{f.icon}</span>
                                    </div>
                                    <span className={`text-[10px] font-medium transition-colors ${filter === f.value ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{f.name}</span>
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