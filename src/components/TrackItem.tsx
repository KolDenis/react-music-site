import React, { useEffect, useState } from 'react'
import '../styles/TrackItem.scss';
import { Artist, Track } from '../types';
import { downloadMusic, getCreator } from '../http';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { trackSlice } from '../store/trackSlice';
import { useNavigate, Link} from 'react-router-dom';

interface Props{
    track: Track;
}

const TrackItem = ({track}:Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {selectTrack, play, addInQueue} = trackSlice.actions;
    const {playing, currentTrack} = useAppSelector((state:any)=>state.trackReducer);
    const [artist, setArtist] = useState<Artist>();
    const [visibleButtons, setVisibleButtons] = useState<boolean>(false);

    useEffect(()=>{
        getCreator(track.creator).then(res=>{
            if(res instanceof Error){
                navigate('/error', {state: {message: res.message}})
                return;
            } 
            setArtist(res);
        });
    }, []);

    const download = () => {
        downloadMusic(track.fileName).then((response) => {
            if(response instanceof Error) return;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", track.name + '.mp3');
            link.click();
        });
    }

    const playButtonHandle = () => {
        if(currentTrack){
            if(currentTrack.id === track.id){
                dispatch(play(!playing));
                return
            }
        }
        dispatch(selectTrack(track));
    }

    return (
        <div className="trackItem" onMouseEnter={()=>setVisibleButtons(true)} onMouseLeave={()=>setVisibleButtons(false)}>
            <button className='trackButtonPlay' onClick={playButtonHandle}>{playing && currentTrack?.id === track.id ? 'Pause' : 'Play'}</button>
            <div className="trackTexts">
                <span className='trackName'>{track.name}</span>
                <Link className='trackArtist' to={'/artists/'+track.creator.toString()}>{artist?.name}</Link>
            </div>
            {
                visibleButtons?
                <><button className='trackButtonAddInQueue' onClick={()=>{dispatch(addInQueue(track))}}>Add in queue</button>
                <button className='trackButtonDownload' onClick={download}>Download</button></>:
                <></>
            }
        </div>
    )
}

export default TrackItem;