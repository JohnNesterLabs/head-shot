import React from 'react';
import { useNavigate } from 'react-router-dom';
import { POPULAR_STYLES } from '../constants';
import { useAppContext } from '../context/AppContext';

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAppContext();

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-fade-in">
            {/* TopAppBar */}
            <div className="flex items-center p-4 pb-2 justify-between z-10">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">camera_enhance</span>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Headshots</h2>
                </div>
                <div className="flex items-center justify-end gap-3">
                    {user ? (
                        <>
                            <button onClick={() => navigate('/gallery')} className="text-slate-500 dark:text-[#929bc9] text-sm font-bold hover:text-primary transition-colors">Gallery</button>
                            <button onClick={logout} className="text-slate-500 dark:text-[#929bc9] text-sm font-bold hover:text-red-500 transition-colors">Log Out</button>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className="text-slate-500 dark:text-[#929bc9] text-sm font-bold leading-normal tracking-[0.015em] hover:text-primary transition-colors">Log In</button>
                    )}
                </div>
            </div>
            {/* Main Content Scroll Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                {/* Hero Section: Transformation Visual */}
                <div className="px-4 pt-4 pb-6">
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                        <div className="absolute inset-0 flex">
                            <div className="w-1/2 h-full relative border-r border-white/20">
                                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1hl4rb1f7pEagkDGyP8Gd7ShaNZ9xbMOi9VPFptkNy1Rzw8sIYLtRBqvnlTDfhdid8sBiYFxxPUkLC7iLsIcNkJ73owc1rOdcciK_SEO_b-7U6NLPj1jSacSaLzdfGl3rhpyg81rdLHzcv32tcB-Brq32GA9WFOWbDUboRlDR9Ai6C3yor-ai0uDlBXg--jYaCLW3tWTbaeHf9_mAZ_bQtpeCJldntUteOw0-gVIEf3mUirzRHIdP8U2ipj0okT74afiOshxWvRZJ")'}}></div>
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white/90 border border-white/10">Original</div>
                            </div>
                            <div className="w-1/2 h-full relative">
                                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdslAOWmdJfhCru6Z980UGd2AzaBpS4uiJSt-cjPrWT-aW94_MRDNBqr6d1t4eO0teuw9PqZXjCpAgZy-iRZ3jtPnBVJWL6e6q-AQda-wbsHkqS33mjBtahg3umsNZ3yG8hY35sGDXj0ocg8aabXEajYIqJ_ojc4zm8DRRGYRZFPEhNsHmymKG6AW3r-F-chBupBDqmpDIH9cbtbjFIClmX-5N1E9_kxNXbifJzmwRKxxNuHmqflWe0GzODs1y20mWR0EO6A-JOfQH")'}}></div>
                                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white shadow-lg shadow-primary/20">AI Pro</div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/50 -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)] flex items-center justify-center">
                            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-0">
                                <span className="material-symbols-outlined text-primary text-sm font-bold">compare_arrows</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* HeadlineText */}
                <div className="px-4">
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-[1.1] text-center mb-3">Turn Selfies into Professional Headshots</h1>
                </div>
                {/* BodyText */}
                <div className="px-4">
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center max-w-xs mx-auto">Get studio-quality photos in minutes without leaving your home. Powered by advanced AI.</p>
                </div>
                {/* Carousel: Styles */}
                <div className="mt-8 mb-4">
                    <div className="px-4 mb-3 flex items-center justify-between">
                        <h3 className="text-slate-900 dark:text-white text-sm font-semibold uppercase tracking-wider opacity-80">Popular Styles</h3>
                    </div>
                    <div className="flex overflow-x-auto no-scrollbar px-4 gap-3 snap-x snap-mandatory pb-4">
                        {POPULAR_STYLES.map(style => (
                            <div key={style.id} className="flex-none w-40 snap-center">
                                <div className="flex flex-col gap-2">
                                    <div className="w-full aspect-[3/4] rounded-xl bg-cover bg-center border border-white/5" style={{backgroundImage: `url("${style.img}")`}}></div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-sm font-medium">{style.title}</p>
                                        <p className="text-slate-500 dark:text-slate-500 text-xs">{style.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-6"></div>
            </div>
            {/* Sticky Bottom Action Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 p-5 pb-8 z-20">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                        <img alt="User avatar 1" className="w-6 h-6 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChif22E9JOeZTNE-tPQ3kEeAEbWQkIZAlvtnhR2zLLQbvJj6TrN-DmU92BB_eHFVWR-18uci-jjVBB1YYYsrwqiBhsJ3MNyOf0nJrL1ptVQR5-h8XtxvLPwyjc0VuNa1RwmmaA3YpcJHtHOzzwWA9O5DjRguhlCLwP4sBoXMbiftYJ2yACs05SVFl3Vm5DdvkDFKqHXNZjNMT-qupic5k-WnmjAhsOznwOP97MyLdOyZqlCL8aAyWIpQEmDBgl4hAnuqhVXVqTWQKw"/>
                        <img alt="User avatar 2" className="w-6 h-6 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGvt5IzWrWR1L7d5D75dHeanSXcxTmc0sDOutwOkv_6lnIl6nvBenU9hlvwcuSNiEvvxpwJwDiGbhVqlmxtL9hRsVnsegUtQd8BiIhP_hdYxArtsgEqOQObr-uYLXwgzgE9KP2jVgusgztEB18dspFCLE2nZyh8y8G8_wDPrRna1WBqV56TtUb3U2tGhBDPiJOME0svuT2mZFkz8fgiTjrsZc-nT7Asa2ge3PVv7bMSejQBZSyfQBPF3Ih8vketjKS8qUskydZfYuu"/>
                        <img alt="User avatar 3" className="w-6 h-6 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8vfSivMFackyo_otKa-AGuyGhr1XLraOY2zr068yFO3gaCZ3pjAPTDPhRYvRNFkcDjzyMs3wteUUKp5eDoMeafkehytrb1A6WrIJKW8uADD1okcTwaf-_TIsPMTJUZt8BHhPmPKocWSUJcwaH6axgECKVVbDMD1dzXMQ4pu2nb55hNWrZ_dt5O0KC5zxQPrvUqF1Xc1duYQqLcvoHCYG9L7aQH02bIKOQeg1H58Q6KlRJ7SRRvJJFBHbcivGAVq_p-78L_dVC2_uZ"/>
                    </div>
                    <p className="text-slate-500 dark:text-[#929bc9] text-xs font-medium">Trusted by 10k+ professionals</p>
                </div>
                <button onClick={() => navigate('/upload')} className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                    Create My Headshots
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;