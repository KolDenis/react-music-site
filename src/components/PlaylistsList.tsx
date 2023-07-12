import React, { useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Playlist } from '../types';
import { getTopPlaylists } from '../http';
import { serverName } from '../constance';
import '../styles/ArtistsList.scss';

const PlaylistsList = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState<Playlist[]>();

    useEffect(()=>{
        getTopPlaylists().then((res)=>{
            if(res instanceof Error){
                navigate('/error', {state: {message: res.message}})
                return;
            }
            setPlaylists(res);
        });
    }, []);

    return (
        <div className="artists">
            <div className="artistsListTitle">Плейлисти</div>
            <div className="artistsList">
            {
                playlists?.map(playlist => (
                    <Link to={'/playlists/'+playlist.id.toString()} className='artistCell' key={playlist.id}>
                        <img src={serverName + playlist.image} alt={playlist.name} className='artistImage'/>
                        <span className='artistName'>{playlist.name}</span>
                    </Link>
                ))
            }
            </div>
        </div>
    )
}

export default PlaylistsList;