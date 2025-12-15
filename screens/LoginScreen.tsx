import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !name) {
            setError('Please fill in all fields');
            return;
        }
        login(email, name);
        navigate('/');
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark animate-fade-in justify-center px-6">
            <div className="absolute top-4 left-4">
                <button onClick={() => navigate('/')} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px] text-slate-900 dark:text-white">close</span>
                </button>
            </div>
            
            <div className="w-full mb-8 text-center">
                <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-6 text-primary">
                    <span className="material-symbols-outlined text-4xl">lock</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                <p className="text-slate-500 dark:text-slate-400">Sign in to access your gallery and saved headshots.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button type="submit" className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98]">
                    Sign In
                </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account? <span className="text-primary font-bold cursor-pointer">Sign Up</span>
            </p>
        </div>
    );
};

export default LoginScreen;