import React, { useEffect, useState} from 'react'
import '../styles/SearchPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import TracksList from '../components/TracksList';
import ArtistsList from '../components/ArtistsList';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!location.state){
            navigate('/');
            return;
        }
    }, [location]);

    return (
        <div className="SearchPage">
            <TracksList searching={location.state}></TracksList>
            <ArtistsList searching={location.state}></ArtistsList>
        </div>
    )
}

export default SearchPage;