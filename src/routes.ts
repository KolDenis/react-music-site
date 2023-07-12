import { FC } from "react";
import Main from "./pages/Main";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import ArtistPage from "./pages/ArtistPage";
import PlaylistPage from "./pages/PlaylistPage";
import GenresPage from "./pages/GenresPage";
import Artists from "./pages/Artists";
import Playlists from "./pages/Playlists";

interface Component{
    path: string;
    page: FC;
}

export const publicRoutes : Component[] = [
    {
        path: '/',
        page: Main
    },
    {
        path: '/error',
        page: ErrorPage
    },
    {
        path: '/search',
        page: SearchPage,
    },
    {
        path: '/artists/:id',
        page: ArtistPage,
    },
    {
        path: '/playlists/:id',
        page: PlaylistPage,
    },
    {
        path: '/genres',
        page: GenresPage,
    },
    {
        path: '/artists',
        page: Artists,
    },
    {
        path: '/playlists',
        page: Playlists,
    },
]