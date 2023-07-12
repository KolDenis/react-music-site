import React from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/ErrorPage.scss';

const ErrorPage = () => {
    const location = useLocation();
    const state = location.state;

    return (
        <div className='ErrorPage'>
            <div className='errorMessage'>{state ? state.message : 'Помилка'}</div>
        </div>
    )
}

export default ErrorPage;