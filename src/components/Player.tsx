import React, { useState, useRef, useEffect } from 'react'
import '../styles/Player.scss';
import { downloadMusic } from '../http';
import { serverName } from '../constance';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { trackSlice } from '../store/trackSlice';

const Player = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressPlaceRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState<string>('0px');
    const [widthSecond, setWidthSecond] = useState<number>(0);
    const {playing, currentTrack} = useAppSelector((state:any)=>state.trackReducer);
    const {play, finishTrack} = trackSlice.actions;
    const dispatch = useAppDispatch();
    const [volume, setVolume] = useState(50);
    
    useEffect(()=>{
        if(!audioRef.current) return;
        audioRef.current.onended = function () {
            dispatch(play(false));
        }
    }, []);

    useEffect(()=>{
        if(!currentTrack) return;
        if(!audioRef.current) return;

        audioRef.current.onloadeddata = function() {
            if(!audioRef.current) return;

            if(progressPlaceRef.current){
                setWidthSecond(progressPlaceRef.current.offsetWidth / audioRef.current.duration);
            }
        };

        audioRef.current.onended = function() {
            dispatch(finishTrack());
        }

        audioRef.current.src = serverName + currentTrack.fileName;

    }, [currentTrack]);

    useEffect(()=>{
        if(!audioRef.current) return;

        audioRef.current.ontimeupdate = function() {
            if(!audioRef.current) return;
            setProgress((widthSecond * audioRef.current.currentTime).toString() + 'px');
        };

        if(playing){
            audioRef.current.play();
        }
        else{
            dispatch(play(true));
        }
    }, [widthSecond]);

    useEffect(()=>{
        if(!audioRef.current) return;

        if(playing){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }
    }, [playing]);

    const handleVolumeChange = (event:any) => {
        const newVolume = parseInt(event.target.value);
        if(audioRef.current){
            audioRef.current.volume = newVolume/100;
        }
        setVolume(newVolume);
    };

    const handlePlayButton = () =>{
        if(!audioRef.current) return;

        dispatch(play(!playing));
    };

    const download = () => {
        if(!currentTrack) return;

        downloadMusic(currentTrack.fileName).then((response) => {
            if(response instanceof Error) return;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", currentTrack.name + '.mp3');
            link.click();
        });
    }

    const rewind = (event:any) => {
        if(!audioRef.current) return;
        if(widthSecond === 0) return;

        audioRef.current.currentTime = event.pageX / widthSecond;
        setProgress((widthSecond * audioRef.current.currentTime).toString() + 'px');
    }

    return (
        <div className='Player' style={{'top':window.innerHeight-60}}>
            <div ref={progressPlaceRef} className='playingProgressPlace' onClick={rewind}>
                <div style={{'width': progress}} className="playingProgress"></div>
            </div>

            <div className="audioControllPanel">
                <button className='buttonPlay' onClick={handlePlayButton}>{playing? 'pause' : 'play'}</button>
                <div className='musicName'>{currentTrack?.name}</div>
                <input type="range" min="0" max="100" value={volume}
                    onChange={handleVolumeChange} className='playerVolume'/>
                <button className='buttonDownload' onClick={download}>download</button>
            </div>
            
            <audio ref={audioRef} style={{'display': 'none'}}></audio>
        </div>
    )
}

export default Player;