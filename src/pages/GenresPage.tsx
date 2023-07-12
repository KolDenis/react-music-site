import React from 'react'
import '../styles/GenresPage.scss';
import { useLocation } from 'react-router-dom';
import TracksList from '../components/TracksList';
import GenreList from '../components/GenreList';

const GenresPage = () => {
    const location = useLocation();

    return (
        <div className="GenresPage">
            <GenreList className='GenresListOnPage' changedGenre={location.state}></GenreList>
            <TracksList genre={location.state}></TracksList>
        </div>
    )
}

export default GenresPage;