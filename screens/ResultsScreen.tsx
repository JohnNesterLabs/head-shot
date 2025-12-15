import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { RESULTS_DATA, STYLE_OPTIONS } from '../constants';

const ResultsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { selectedStyleId, setSelectedResult } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    const selectedStyle = STYLE_OPTIONS.find(s => s.id === selectedStyleId);

    // Simulate AI Generation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleSelectResult = (result: any) => {
        setSelectedResult(result);
        navigate('/download');
    };

    if (isLoading) {
        return (
            <div className="relative flex h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark items-center justify-center">
                <div className="flex flex-col items-center gap-6 p-8 text-center animate-fade-in">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
                        <div className="absolute inset-0 h-24 w-24 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl text-primary animate-pulse">smart_toy</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Generating...</h2>
                        <p className="text-slate-500 dark:text-slate-400">Applying {selectedStyle?.title || 'Magic'} style to your photo.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark animate-fade-in">
            <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{fontSize: "24px"}}>arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-tight text-center flex-1 text-slate-900 dark:text-white">Your Results</h1>
                <button className="flex items-center justify-center h-10 px-3 text-primary font-semibold text-sm hover:opacity-80 transition-opacity">Select</button>
            </header>
            <main className="flex-1 overflow-y-auto pb-32">
                <div className="px-5 pt-6 pb-2">
                    <h2 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">AI Magic Complete <span className="text-primary">✨</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">We generated 24 professional headshots based on your style preferences.</p>
                </div>
                <div className="w-full px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Featured Choice</p>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Best Match</span>
                    </div>
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group shadow-lg ring-1 ring-slate-900/5 dark:ring-white/10" onClick={() => handleSelectResult(RESULTS_DATA[0])}>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 cursor-pointer" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUmaOGKg4Eu81oMWy4hCuCJluH5cRIfZwk4QMzs9UiFJJBSj3G5F5VThkWsVfDbaWtqckrjrHRmjx4CRswdAIaOHvKKOAf4WtppQe1HZKaMZqi08qyFf39ObBQNwiHOY_vlDbwgNnv8b2MWWxdb3Whw1N9aqUraPgZuZYvl_qKLyZ8wBaT7h1QyUC-7ByPMbsRFjpCXqI3u03z80hAvT6ZCeCeiuNn_H-1d9yaU5IEtPpSCCX33igwUB5gy9cBQzIg5pWnREV4kMQ2")'}}></div>
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button className="size-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined" style={{fontSize: "20px"}}>favorite</span>
                            </button>
                            <button className="size-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined" style={{fontSize: "20px"}}>zoom_out_map</span>
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-sm filled">stars</span>
                                <p className="text-white text-sm font-medium">Studio Lighting • Business</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">All Variations</h3>
                    <button className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        Filter <span className="material-symbols-outlined" style={{fontSize: "14px"}}>filter_list</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3 px-5 pb-6">
                    {RESULTS_DATA.map((item) => (
                        <div key={item.id} className="relative group cursor-pointer" onClick={() => handleSelectResult(item)}>
                            <div className={`w-full aspect-[3/4] bg-cover bg-center rounded-lg overflow-hidden ${item.selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark' : 'border border-slate-200 dark:border-slate-800'}`} style={{backgroundImage: `url("${item.img}")`}}></div>
                            {item.selected ? (
                                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-sm">
                                    <span className="material-symbols-outlined block" style={{fontSize: "16px"}}>check</span>
                                </div>
                            ) : (
                                <button className="absolute top-2 right-2 size-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined" style={{fontSize: "16px"}}>favorite_border</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50">
                <div className="flex flex-col gap-3">
                    <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-base shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined">download</span>
                        Unlock &amp; Download All
                    </button>
                    <button onClick={() => setIsLoading(true)} className="w-full h-10 bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                        <span className="material-symbols-outlined" style={{fontSize: "20px"}}>refresh</span>
                        Regenerate Set
                    </button>
                </div>
                <div className="h-5"></div>
            </div>
        </div>
    );
};

export default ResultsScreen;