import React from 'react'
import '../styles/LinePages.scss';

interface Props{
    setCurrentPage: (number:number)=>void;
    numberPages: number;
    currentPage: number;
}
const LinePages = (props:Props) => {
    
    const selectPage = (number:number) => {
        props.setCurrentPage(number);
    }

    const getButtonsPage = () => {
        const numberItems = [];
        for (let i = 1; i <= props.numberPages; i++) {
            numberItems.push(<button key={i} onClick={()=>selectPage(i)}
            className='buttonPage' disabled={i === props.currentPage}>{i}</button>);
        }
        return numberItems;
    }

    return (
        <div className="LinePages">
            {getButtonsPage()}
        </div>
    )
}

export default LinePages;