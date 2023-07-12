import React from 'react'
import '../styles/Menu.scss';
import CategoryList from './CategoryList';
import GenreList from './GenreList';

const Menu = () => {
    

    return (
        <div className="Menu">
            <CategoryList/>
            <GenreList/>
        </div>
    )
}

export default Menu;