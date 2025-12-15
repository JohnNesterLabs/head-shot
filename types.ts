export interface StyleOption {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    selected?: boolean;
}

export interface ResultImage {
    id: number;
    title: string;
    img: string;
    selected?: boolean;
    category?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface GalleryItem {
    id: string;
    src: string;
    date: number;
}

export interface AppState {
    user: User | null;
    uploadedImage: string | null;
    selectedStyleId: number | null;
    selectedResult: ResultImage | null;
    gallery: GalleryItem[];
}