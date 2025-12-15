import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const GalleryScreen: React.FC = () => {
    const navigate = useNavigate();
    const { gallery, removeFromGallery, user, setUploadedImage } = useAppContext();

    const handleUseImage = (img: string) => {
        setUploadedImage(img);
        navigate('/style'); // Skip editor if reusing from gallery? Or go to editor. Let's go to style for speed.
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-fade-in">
            {/* Header */}
            <div className="flex items-center px-4 py-3 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate('/')} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors -ml-2">
                    <span className="material-symbols-outlined text-[24px] text-slate-900 dark:text-white">arrow_back_ios_new</span>
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">My Gallery</h2>
                    {user && <p className="text-xs text-slate-500 dark:text-slate-400">{user.name}'s Uploads</p>}
                </div>
                <div className="w-10"></div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {gallery.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center pb-20 opacity-60">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">photo_library</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No uploads yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px]">Upload selfies to see them here.</p>
                        <button onClick={() => navigate('/upload')} className="mt-6 text-primary font-bold text-sm">Upload Now</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {gallery.map((item) => (
                            <div key={item.id} className="relative group aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <img src={item.src} alt="Gallery item" className="w-full h-full object-cover" />
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    <button 
                                        onClick={() => handleUseImage(item.src)}
                                        className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                                    >
                                        Use This
                                    </button>
                                    <button 
                                        onClick={() => removeFromGallery(item.id)}
                                        className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                        {new Date(item.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FAB */}
            <div className="absolute bottom-6 right-6">
                <button 
                    onClick={() => navigate('/upload')}
                    className="size-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                </button>
            </div>
        </div>
    );
};

export default GalleryScreen;