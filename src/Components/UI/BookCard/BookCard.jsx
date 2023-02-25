import React, {useEffect, useState} from 'react';
import img from '../../../accets/Black_Book_PNG_Clipart-1048.png'
import './BookCard.scss'
import axios from "axios";
import {url} from "../../App/App";

const BookCard = (props) => {

    const {book} =props

    const [author, setAuthor] = useState(null)

    useEffect(()=>{
        axios.get(url+`authors/${book.author}`).then(resp => setAuthor(resp.data))
    },[])

    return (
        <div className='card'>
            <div className='card__image-wrap'>
                <div className='card__image'>
                    <img src={img} alt="book"/>
                </div>
            </div>
            <div className='card__content'>
                <h3>{book.name}</h3>
                <ul>
                    <li>
                        <p>Genre</p>
                        <p>{book.genre}</p>
                    </li>
                    <li>
                        <p>Pages</p>
                        <p>{book.pageCount}</p>
                    </li>
                    <li>
                        <p>Author</p>
                        {author &&
                            <p>{author.firstName} {author.lastName}</p>}
                    </li>
                </ul>
            </div>
            {/*{currentUser && (currentUser.isAdmin || currentUser.id === author.id) &&*/}
            {/*    <div className='card__action'>*/}
            {/*        <IconButton size='large'*/}
            {/*                    color='primary'*/}
            {/*                    onClick={onEdit}*/}
            {/*        >*/}
            {/*            <Edit fontSize="inherit"/>*/}
            {/*        </IconButton>*/}
            {/*        <IconButton size='large'*/}
            {/*                    color='myColor'*/}
            {/*                    onClick={onDelete}*/}
            {/*        >*/}
            {/*            <DeleteForever fontSize="inherit"/>*/}
            {/*        </IconButton>*/}
            {/*    </div>}*/}
        </div>
    );
};

export default BookCard;