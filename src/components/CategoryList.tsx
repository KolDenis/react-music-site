import React from 'react'
import '../styles/CategoryList.scss';
import { Link } from 'react-router-dom';
import { serverName } from '../constance';

const CategoryList = () => {
    

    return (
        <div className="CategoryList">
            <Link to='artists' className="categoryItem">Артисти</Link>
            <Link to='playlists' className="categoryItem">Плейлисти</Link>
        </div>
    )
}

export default CategoryList;