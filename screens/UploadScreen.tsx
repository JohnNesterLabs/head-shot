import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const UploadScreen: React.FC = () => {
    const navigate = useNavigate();
    const { setUploadedImage } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setIsLoading(false);
                navigate('/editor'); // Navigate to Editor instead of Style
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-fade-in">
            {/* Hidden Inputs */}
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
            />
            <input 
                type="file" 
                ref={cameraInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="user"
                className="hidden" 
            />

            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                        <p className="text-white font-medium">Processing...</p>
                    </div>
                </div>
            )}

            <div className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Upload Selfie</h2>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2 py-2">
                <div className="h-1.5 w-6 rounded-full bg-primary"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex-1 flex flex-col px-6 pt-4 pb-8 overflow-y-auto">
                <h2 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight text-center pb-3">Let's get your best angle</h2>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-center pb-8">To generate professional headshots, we need a clear, well-lit selfie.</p>
                <div className="grid grid-cols-2 gap-4 pb-8">
                    <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg ring-2 ring-emerald-500/50">
                            <div className="absolute inset-0 bg-emerald-500/10 z-10"></div>
                            <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-We4EWkf2zSUQevvRZPcdNSbkm5UDGYvS99Y6mTOqjdQIOtL_i_cCSRq9Tr7dluorGV8oLymVdkYIczuEEQaXOrLftnTvVDQmt_3a5skhEIEEyTDdsrZpbSAD2xAxR0W-wlQETgyDiZ6Lwuy2l5g-r0uXT8aJwt4YmCDgAcmSXPuN8FEysazrxkUtqcytcm_uLmixtWwHQN8nj_a7h5Bi-mCTJZ5aDMbeGkezskywqOKZYHc5clKgen0AXvrzxQerM6kNOmrGOJaJ")'}}></div>
                            <div className="absolute top-2 right-2 z-20 bg-emerald-500 text-white rounded-full p-1 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">check</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                                Do: Good Lighting
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal pl-6">Clear &amp; bright face</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg opacity-80">
                            <div className="w-full h-full bg-center bg-no-repeat bg-cover grayscale-[50%]" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCG4z4igJXCZvYWJroIyyr2HRaWoG388cu_JWsVnm8XW4t8ynOQMjzk93XZqFcDUn5i_r-o7t-tun8OJe2ZQMpVyXzYyclIExFO6t3bpoP47Dd-r1aQ387xnF6-EqtrenQHb5-JmTJEnZ2H5DnKDXznCE9RqLhLSWxw8BZjeFvXylpBTCsCUutPz3si5C84woT5dxWLpwQEG2eP1gTzjq_k5tYQIPZMbrBnfYATUXdnqtC2D9d3QBX5qpA9_C-s_Kz9rAJ3hWH9f4ct")'}}></div>
                            <div className="absolute top-2 right-2 z-20 bg-rose-500 text-white rounded-full p-1 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-rose-500 text-[18px]">cancel</span>
                                Don't: Obstructed
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal pl-6">Sunglasses or shadows</p>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-100 dark:bg-[#1a1a1e] rounded-xl p-5 mb-6 border border-slate-200 dark:border-slate-800/50">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider mb-3 opacity-80">Photo Guidelines</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">wb_sunny</span>
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Use ample natural lighting, avoid harsh shadows.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">face</span>
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Keep face fully visible, look directly at camera.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-rose-400 text-[20px] mt-0.5">block</span>
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">No filters, masks, hats, or sunglasses.</span>
                        </li>
                    </ul>
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-col gap-3 mt-4">
                    <button onClick={() => cameraInputRef.current?.click()} className="w-full bg-primary hover:bg-blue-700 active:scale-[0.98] transition-all text-white font-bold text-base py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">photo_camera</span>
                        Take a Selfie
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="w-full bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition-all text-slate-700 dark:text-white font-medium text-base py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">photo_library</span>
                        Choose from Library
                    </button>
                </div>
                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Photos are automatically deleted after processing.
                </p>
            </div>
        </div>
    );
};

export default UploadScreen;