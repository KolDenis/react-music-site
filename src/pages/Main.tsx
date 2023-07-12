import React, { useState, useEffect } from 'react'
import '../styles/Main.scss';
import { useNavigate } from 'react-router-dom';
import ArtistsList from '../components/ArtistsList';
import TracksList from '../components/TracksList';
import PlaylistsList from '../components/PlaylistsList';

const Main = () => {

    return (
        <div className='Main'>
            <ArtistsList></ArtistsList>
            <TracksList></TracksList>
            <PlaylistsList></PlaylistsList>
        </div>
    )
}

export default Main;