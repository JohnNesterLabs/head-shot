import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResultImage, User, GalleryItem } from '../types';

interface AppContextType {
    user: User | null;
    login: (email: string, name: string) => void;
    logout: () => void;
    uploadedImage: string | null;
    setUploadedImage: (img: string | null) => void;
    selectedStyleId: number;
    setSelectedStyleId: (id: number) => void;
    selectedResult: ResultImage | null;
    setSelectedResult: (result: ResultImage | null) => void;
    gallery: GalleryItem[];
    addToGallery: (img: string) => void;
    removeFromGallery: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // User State
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('ai_headshots_user');
        return stored ? JSON.parse(stored) : null;
    });

    // Gallery State
    const [gallery, setGallery] = useState<GalleryItem[]>(() => {
        const stored = localStorage.getItem('ai_headshots_gallery');
        return stored ? JSON.parse(stored) : [];
    });

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedStyleId, setSelectedStyleId] = useState<number>(1);
    const [selectedResult, setSelectedResult] = useState<ResultImage | null>(null);

    useEffect(() => {
        if (user) {
            localStorage.setItem('ai_headshots_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ai_headshots_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('ai_headshots_gallery', JSON.stringify(gallery));
    }, [gallery]);

    const login = (email: string, name: string) => {
        setUser({ id: Date.now().toString(), email, name });
    };

    const logout = () => {
        setUser(null);
    };

    const addToGallery = (img: string) => {
        const newItem: GalleryItem = {
            id: Date.now().toString(),
            src: img,
            date: Date.now(),
        };
        // Add to beginning of array
        setGallery(prev => [newItem, ...prev]);
    };

    const removeFromGallery = (id: string) => {
        setGallery(prev => prev.filter(item => item.id !== id));
    };

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            uploadedImage,
            setUploadedImage,
            selectedStyleId,
            setSelectedStyleId,
            selectedResult,
            setSelectedResult,
            gallery,
            addToGallery,
            removeFromGallery
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};