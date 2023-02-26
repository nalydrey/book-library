import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './AuthorCard.scss'
import { url } from '../../App/App'
import ava from '../../../accets/avatar.png'
import {useSelector} from "react-redux";
import {IconButton} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";


const AuthorCard = (props) => {


    const { author, onClick, refreshCount, afterDeleteUser=()=>{} } = props

    const user = useSelector(state => state.currentUser)
    const [books, setBooks] = useState(0)

    useEffect(()=>{
        axios.get(url+`books?author=${author.id}&_limit=0`).then(resp => {
            setBooks(resp.headers['x-total-count']);
        })
    }, [refreshCount])

    const onDelete = (e) => {
        e.stopPropagation()
        axios.delete(url+`authors/${author.id}`).then(resp=>{
            afterDeleteUser()
        })
    }

  return (
    <div className='author' 
         onClick={() => onClick(author.id)}
    >
        <div className='author__ava'>
            <img src={ava} alt=""/>
        </div>
        <div className='author__content'>
            <h3>{author.firstName} {author.lastName}</h3>
            <p className='first_p'>Books</p>
            <p>{books}</p>
            {user && !author.isAdmin && (user.isAdmin || user.id === author.id)  &&
            <div className='del'>
                <IconButton size='large'
                            color='myColor'
                            onClick={onDelete}
                >
                    <DeleteForever sx={{color: 'red'}} fontSize="inherit"/>
                </IconButton>
            </div>}
        </div>
    </div>
  )
}

export default AuthorCard