import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './AuthorCard.scss'
import { url } from '../../App/App'
import ava from '../../../accets/avatar.png'


const AuthorCard = (props) => {

    const { author, onClick } = props

    const [books, setBooks] = useState(0)

    useEffect(()=>{
        axios.get(url+`books?author=${author.id}&_limit=0`).then(resp => {
            setBooks(resp.headers['x-total-count']);
        })
    }, [])


  return (
    <div className='author' 
         onClick={() => onClick(author.id)}
    >
        <div className='author__ava'>
            <img src={ava} alt=""/>
        </div>
        <div className='author__content'>
            <h3>{author.firstName} {author.lastName}</h3>
            <p>Books</p>
            <p>{books}</p>
            {/* {user && user.isAdmin && !isAdmin &&

            <div className='del'>
                <IconButton size='large'
                            color='myColor'
                            onClick={onDelete}
                >
                    <DeleteForever fontSize="inherit"/>
                </IconButton>
            </div>} */}
        </div>
    </div>
  )
}

export default AuthorCard