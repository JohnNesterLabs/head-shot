import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const DownloadScreen: React.FC = () => {
    const navigate = useNavigate();
    const { selectedResult } = useAppContext();

    // Fallback if accessed directly
    const imageUrl = selectedResult?.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzQqgqrhFikUp368KicBYZEPvg5P_i4xxKNEPlolCspGRnuNPwheEY1zVc8h6Jl6vtCovxeDnxJhy1_osBER8MSx2_KHBVSMhW5PkXF68L1C9IMKMrqbpCjYu5x2f2FG_HtlUrqyFK14geATFDQY40khu4VECEZS1oiRM2LE_lVBDAeBoK1B6Jq-CR3xvhtAhBEBN9h3g_glhK4uBdjpF9H76HtO5CHAxc838tgLvFDcscqtRc11d8QpIMd--22XzRrDABhKDVLulZ';

    const handleDownload = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `ai-headshot-${selectedResult?.id || 'pro'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display h-screen w-full flex flex-col overflow-hidden text-slate-900 dark:text-white select-none max-w-md mx-auto shadow-2xl relative animate-fade-in">
            <header className="flex items-center justify-between px-4 pt-safe pb-2 z-20 shrink-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
                <button aria-label="Go back" onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors -ml-2">
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-center flex-1">Your Headshot</h2>
                <button onClick={() => navigate('/')} className="flex items-center justify-end h-10 px-2 -mr-2 text-[#929bc9] text-base font-bold hover:text-primary transition-colors">Done</button>
            </header>
            <main className="flex-1 w-full flex flex-col items-center justify-center p-6 min-h-0 relative">
                <div className="relative w-full max-w-sm h-full max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group animate-fade-in">
                    <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: `url("${imageUrl}")`}}></div>
                    <div className="absolute top-4 right-4 z-10">
                        <div className="flex h-7 items-center justify-center gap-x-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 pl-2.5 pr-3 shadow-lg">
                            <span className="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
                            <p className="text-white text-[10px] font-bold uppercase tracking-wider leading-normal">AI Enhanced</p>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 z-10">
                        <div className="flex h-7 items-center justify-center gap-x-1.5 rounded-lg bg-[#232948]/80 backdrop-blur-md pl-3 pr-3 border border-white/10">
                            <p className="text-white text-xs font-semibold leading-normal">4K Ultra HD</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </main>
            <footer className="shrink-0 w-full max-w-md mx-auto px-5 pb-safe z-20 flex flex-col gap-4 bg-background-light dark:bg-background-dark pb-6">
                <div className="flex gap-3 w-full">
                    <button className="flex flex-1 min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-secondary-surface active:bg-[#2e365e] text-white transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined mr-2 text-[20px]">ios_share</span>
                        <span className="text-base font-bold tracking-[0.015em] truncate">Share</span>
                    </button>
                    <button onClick={handleDownload} className="flex-[2] flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-primary hover:bg-blue-600 active:bg-blue-700 text-white shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined mr-2 text-[22px]">download</span>
                        <span className="text-base font-bold tracking-[0.015em] truncate">Save to Photos</span>
                    </button>
                </div>
                <div className="pb-2">
                    <p className="text-[#929bc9] text-xs font-medium leading-normal text-center flex items-center justify-center gap-1.5 opacity-80">
                        <span className="material-symbols-outlined text-[14px] filled">verified</span>
                        No watermark included • Full Resolution
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default DownloadScreen;