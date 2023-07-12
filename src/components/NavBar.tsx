import React, { useState } from 'react'
import '../styles/NavBar.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    const searchHandle = () => {
        setSearchText('');
        navigate(`/search`, {state: searchText});
    }

    const handleKeyDown = (event:any) => {
        if(event.key === 'Enter'){
            searchHandle();
        }
    }

    return (
        <div className='NavBar'>
            <Link to='/' className="navBarTitle">BeatBurst</Link>
            <div className="navBarSearch">
                <input type='text' placeholder='write any text' className="searchLine"
                value={searchText} onChange={e=>setSearchText(e.target.value)} onKeyDown={handleKeyDown}></input>
                <button className="searchButton" onClick={searchHandle}>Search</button>
            </div>
            <button className="buttonLogIn">Log In</button>
        </div>
    )
}

export default NavBar;