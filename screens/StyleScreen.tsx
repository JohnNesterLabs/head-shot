import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { STYLE_OPTIONS } from '../constants';

const StyleScreen: React.FC = () => {
    const navigate = useNavigate();
    const { selectedStyleId, setSelectedStyleId } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter logic can be added here if needed, currently showing all or simple mock filter
    const filteredStyles = selectedCategory === 'All' 
        ? STYLE_OPTIONS 
        : STYLE_OPTIONS.filter(s => s.title.includes(selectedCategory) || s.subtitle.includes(selectedCategory));

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-fade-in">
            <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 px-4 py-3 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Select Style</h1>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px] text-slate-900 dark:text-white">help</span>
                </button>
            </header>
            <main className="flex flex-col gap-4 px-4 pt-2">
                <div>
                    <h2 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Choose your Look</h2>
                    <p className="mt-2 text-base font-normal leading-normal text-slate-500 dark:text-slate-400">Select the backdrop and vibe for your professional headshots.</p>
                </div>
                <div className="-mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-hide no-scrollbar">
                    <div className="flex gap-3">
                        {['All', 'Corporate', 'Creative', 'Casual'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${
                                    selectedCategory === cat 
                                    ? 'bg-primary shadow-lg shadow-primary/25' 
                                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                                }`}
                            >
                                <p className={`text-sm font-medium ${selectedCategory === cat ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{cat}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4">
                    {filteredStyles.map((option) => (
                        <div key={option.id} onClick={() => setSelectedStyleId(option.id)} className="group relative flex flex-col gap-3 cursor-pointer">
                            <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 transition-all ${
                                selectedStyleId === option.id 
                                ? 'ring-4 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark' 
                                : 'border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                            }`}>
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: `url("${option.img}")`}}></div>
                                {selectedStyleId === option.id && (
                                    <div className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary shadow-sm">
                                        <span className="material-symbols-outlined text-[16px] text-white font-bold">check</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className={`text-base leading-normal ${selectedStyleId === option.id ? 'font-bold text-primary' : 'font-medium text-slate-900 dark:text-white'}`}>{option.title}</p>
                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">{option.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 dark:border-white/5 bg-background-light/90 dark:bg-background-dark/90 px-4 py-4 backdrop-blur-xl max-w-md mx-auto">
                <button onClick={() => navigate('/results')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-center font-bold text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98] hover:bg-blue-700">
                    <span>Continue with {STYLE_OPTIONS.find(s => s.id === selectedStyleId)?.title}</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default StyleScreen;