import React, { useState, useEffect } from 'react';
import '../styles/GenreList.scss';
import { getGenres, getGenresOfCreator } from '../http';
import { useNavigate } from 'react-router-dom';
import { Genre } from '../types';
import { Link } from 'react-router-dom';

interface Props{
    artist?:number;
    title?:boolean;
    className?:string;
    changedGenre?:number;
}

const GenreList = ({artist, title, className, changedGenre}:Props) => {
    const [genres, setGenres] = useState<Genre[]>();
    const navigate = useNavigate(); 

    useEffect(()=>{
        if(!artist){
            getGenres().then(serverResponcehandler)
        }
        else{
            getGenresOfCreator(artist).then(serverResponcehandler)
        }
    }, []);

    const serverResponcehandler = (res:any) => {
        if(res instanceof Error){
            navigate('/error', {state: {message: res.message}})
            return;
        }
        setGenres(res);
    }

    const goToGenres = (genreId:number) => {
        navigate(`/genres`, {state: genreId});
    }
    

    return (
        <div className={"GenreList " + className}>
            {
                title === undefined || title?
                <div className="genresListTitle">Жанри</div>:
                <></>
            }
            <div className="genresTable">
            {
                genres?.map(itm=>(
                    <button className="genreItem" disabled={itm.id === changedGenre} key={itm.id} onClick={()=>goToGenres(itm.id)} >
                        <span>{itm.name}</span>
                    </button>
                ))
            }
            </div>
        </div>
    )
}

export default GenreList;