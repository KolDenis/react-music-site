import React, { useEffect, useState } from 'react'
import '../styles/ArtistPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Artist, Track} from '../types';
import { getCreator, getMusicOfCreator } from '../http';
import { serverName } from '../constance';
import TracksList from '../components/TracksList';
import GenreList from '../components/GenreList';

const ArtistPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [artist, setArtist] = useState<Artist>();
    const [numberTracks, setNumberTracks] = useState<number>(0);

    useEffect(()=>{
        const path: string[] = location.pathname.split('/');
        console.log(path);
        getCreator(parseInt(path[2])).then(res=>{
            if(res instanceof Error){
                navigate('/error', {state: {message: res.message}})
                return;
            }
            setArtist(res); 
        });
    }, []);

    return (
        <div className="ArtistPage">
            <div className="artistInfo">
                {
                    artist?
                    <img src={artist.image? serverName + artist.image: '/images/defaultPicture.jpg'} alt={artist?.name} className="ArtistImage"/>:
                    <></>
                }
                <div className="artistInfoChild">
                    <h2 className='artistName'>{artist?.name}</h2>
                    <div className="artistNumberTracks">{'Кількість треків: ' + numberTracks.toString()}</div>
                    {
                        artist?
                        <GenreList title={false} artist={artist.id}></GenreList>:
                        <></>
                    }
                </div>
            </div>
            <TracksList artist={artist?.id} setNumberTracks={setNumberTracks}></TracksList>
        </div>
    )
}

export default ArtistPage;