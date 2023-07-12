export interface Track{
    id: number,
    name: string, 
    fileName: string,
    creator: number,
}

export interface Artist{
    id: number,
    name: string,
    image: string,
}

export interface Playlist{
    id: number,
    name: string,
    image: string,
}

export interface Genre{
    id: number,
    name: string,
}