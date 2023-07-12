import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Artist } from '../types';
import { findCreators, getTopCreators, fetchCreators } from '../http';
import { serverName } from '../constance';
import '../styles/ArtistsList.scss';
import LinePages from './LinePages';


interface Props{
    searching?:string;
}

const ArtistsList = (props:Props) => {
    const navigate = useNavigate();
    const [artists, setArtists] = useState<Artist[]>();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberPages, setNumberPages] = useState<number>(1);

    useEffect(()=>{
        if(location.pathname === '/'){
            getTopCreators().then((res)=>{
                if(res instanceof Error){
                    navigate('/error', {state: {message: res.message}})
                    return;
                }
                setArtistsAndPages(res);
            });
        }
        else if(location.pathname === '/artists'){
            fetchCreators(10, currentPage, {}).then((res)=>{
                if(res instanceof Error){
                    navigate('/error', {state: {message: res.message}})
                    return;
                }
                setArtistsAndPages(res);
            });
        }
        else if(props.searching){
            findCreators(location.state, 5, currentPage).then(res => {
                if(res instanceof Error)
                {
                    navigate('/error', {state: {message: res.message}})
                    return;
                }
                    
                setArtistsAndPages(res);
            })
        }
    }, [currentPage]);

    const setArtistsAndPages = (res:any) => {
        setArtists(res.creators);
        setNumberPages(res.numberPages);
    }

    return (
        <div className="artists">
            <div className="artistsListTitle">Артисти</div>
            <div className="artistsList">
            {
                !artists?
                <h2 className='textFound'>Пошук артистів...</h2>:
                <>
                {
                    artists.length > 0?
                    artists.map(artist => (
                        <Link to={'/artists/'+artist.id.toString()} className='artistCell' key={artist.id}>
                            <img src={artist.image? serverName + artist.image: '/images/defaultPicture.jpg'} alt={artist.name} className='artistImage'/>
                            <span className='artistName'>{artist.name}</span>
                        </Link>
                    )):
                    <h2 className='textFound'>Артистів не знайдено</h2>
                }
                </>                
            }
            </div>
            {
                location.pathname != '/'?
                <LinePages setCurrentPage={setCurrentPage} numberPages={numberPages} currentPage={currentPage}></LinePages>:
                <></>
            }
        </div>
    )
}

export default ArtistsList;