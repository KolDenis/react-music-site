import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Track } from '../types';
import '../styles/TracksList.scss';
import { findTracks, getMusicOfCreator, getMusicOfGenre, getMusicOfPlaylist, getTopMusic } from '../http';
import TrackItem from './TrackItem';
import LinePages from './LinePages';

interface Props{
    searching?:string;
    artist?:number;
    playlist?:number;
    genre?:number;
    setNumberTracks?: (val:number) => void;
}

const TracksList = (props:Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tracks, setTracks] = useState<Track[]>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberPages, setNumberPages] = useState<number>(1);

    useEffect(()=>{
        if(location.pathname === '/'){
            getTopMusic().then(serverResponcehandler);
            return;
        }
    }, [currentPage]);

    useEffect(()=>{
        if(props.searching){
            findTracks(props.searching, 10, currentPage).then(serverResponcehandler)
            return;
        }
    }, [props.searching, currentPage]);

    useEffect(()=>{
        if(props.artist){
            getMusicOfCreator(props.artist, 10, currentPage).then(serverResponcehandler);
            return;
        }
    }, [props.artist, currentPage]);

    useEffect(()=>{
        if(props.playlist){
            getMusicOfPlaylist(props.playlist, 10, currentPage).then(serverResponcehandler);
            return;
        }
    }, [props.playlist, currentPage]);

    useEffect(()=>{
        if(props.genre){
            getMusicOfGenre(props.genre, 10, currentPage).then(serverResponcehandler);
            return;
        }
    }, [props.genre, currentPage]);

    const serverResponcehandler = (res:any) => {
        if(res instanceof Error){
            navigate('/error', {state: {message: res.message}})
            return;
        }
        setTracksAndPages(res);
    }

    const setTracksAndPages = (res:any) => {
        console.log(res.tracks);
        setTracks(res.tracks);
        setNumberPages(res.numberPages);
        
        if(props.setNumberTracks){
            props.setNumberTracks(res.numberTracks);
        }
    }

    return (
        <div className='tracks'>
            <div className="tracksListTitle">{'Треки'}</div>
            <div className='tracksList'>
            {
                !tracks?
                <h2 className='textFound'>Пошук треків...</h2>:
                <>
                {
                    tracks.length > 0?
                    tracks?.map(track => (
                        <TrackItem track={track} key={track.id}></TrackItem>
                    )):
                    <h2 className='textFound'>Треків не знайдено</h2>
                }
                </>
                
            }
            </div>
            {
                location.pathname != '/' ? 
                <LinePages setCurrentPage={setCurrentPage} numberPages={numberPages} currentPage={currentPage}></LinePages>:
                <></>
            }
        </div>
    )
}

export default TracksList;