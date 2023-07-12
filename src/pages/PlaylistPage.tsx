import React, { useEffect, useState } from 'react'
import '../styles/ArtistPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Artist, Playlist, Track} from '../types';
import { getMusicOfPlaylist, getPlaylist } from '../http';
import { serverName } from '../constance';
import TracksList from '../components/TracksList';
import { useAppDispatch } from '../hooks/reduxHooks';
import { trackSlice } from '../store/trackSlice';

const PlaylistPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<Playlist>();
    const dispatch = useAppDispatch();
    const {addInQueue} = trackSlice.actions;

    useEffect(()=>{
        const path: string[] = location.pathname.split('/');
        getPlaylist(parseInt(path[2])).then(res=>{
            if(res instanceof Error){
                navigate('/error', {state: {message: res.message}})
                return;
            }
            setPlaylist(res); 
        });
    }, []);

    const playlistListen = () => {
        if(!playlist) return;

        getMusicOfPlaylist(playlist.id, 100, 1).then(res => {
            if(res instanceof Error){
                navigate('/error', {state: {message: res.message}})
                return;
            }
            const tracksInPlaylist:Track[] = res.tracks;
            tracksInPlaylist.forEach((itm:Track) => {
                dispatch(addInQueue(itm));
            })
        })
    }

    return (
        <div className="ArtistPage">
            <div className="artistInfo">
                {
                    playlist?
                    <img src={serverName + playlist.image} alt={playlist?.name} className="ArtistImage"/>:
                    <></>
                }
                
                <div className="artistInfoChild">
                    <h2 className='artistName'>{playlist?.name}</h2>
                    <button className='trackButtonPlay' onClick={playlistListen}>Слухати</button>
                </div>
            </div>
            <TracksList playlist={playlist?.id}></TracksList>
        </div>
    )
}

export default PlaylistPage;