import React, {useEffect, useState} from 'react';
import img from '../../../accets/Black_Book_PNG_Clipart-1048.png'
import './BookCard.scss'
import axios from "axios";
import {url} from "../../App/App";
import {useSelector} from "react-redux";
import {IconButton} from "@mui/material";
import {DeleteForever, Edit} from "@mui/icons-material";
import {autoFillBookForm, showHideBookForm} from "../../../store/action_creators/actionCreatorBookForm";

const BookCard = (props) => {

    const {book, loadBooks} =props

    const [author, setAuthor] = useState('')
    const currentUser = useSelector(state => state.currentUser)

    useEffect(()=>{
        axios.get(url+`authors/${book.author}`)
            .then(resp => setAuthor(resp.data))
    },[])

    const onEdit = (book) => {
        showHideBookForm(true, true)
        autoFillBookForm(book)
    }
    const onDelete = () => {
        axios.delete(url+`books/${book.id}`).then(resp=> loadBooks())
    }

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
            {currentUser && (currentUser.isAdmin || currentUser.id === author.id) &&
                <div className='card__action'>
                    <IconButton size='large'
                                color='primary'
                                onClick={()=>onEdit(book)}
                    >
                        <Edit fontSize="inherit"/>
                    </IconButton>
                    <IconButton size='large'
                                color='myColor'
                                onClick={onDelete}
                    >
                        <DeleteForever sx={{color: 'red'}} fontSize="inherit"/>
                    </IconButton>
                </div>}
        </div>
    );
};

export default BookCard;