import React, {useEffect, useState} from 'react'
import BookCard from "../UI/BookCard/BookCard";
import axios from "axios";
import {url} from "../App/App";
import './BooksContainer.scss'
import {Box, MenuItem, Pagination, TextField} from "@mui/material";
import * as PropTypes from "prop-types";


const BooksContainer = (props) => {

    const {authorId=''} = props


    const limit = 2
    const arr = [
        {
            label: 'Name',
            value: 'name',
        },
        {
            label: 'Name reverse',
            value: 'nameRev',
        },
        {
            label: 'Genre',
            value: 'genre',
        },
        {
            label: 'Genre reverse',
            value: 'genreRev',
        },
        {
            label: 'Pages',
            value: 'count',
        },
        {
            label: 'Pages reverse',
            value: 'countRev',
        }
    ]

    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [pageQty, setPageQty] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const loadBooks = (string) =>{
        console.log(authorId)
        axios.get(url+`books?${authorId&&`author=${authorId}`}&_limit=${limit}&_page=${currentPage}&${string}`)
            .then(resp => {
                const totalBooks = +resp.headers['x-total-count']
                const pages = Math.ceil(totalBooks/limit)
                setTotalBooks(totalBooks)
                setPageQty(pages)
                setBooks(resp.data)
            }
        )
    }

    useEffect(()=>{
        // console.log(authorId)
        loadBooks()
    }, [currentPage, authorId])

    const sort = (e) => {
        console.log(e.target.value)
        switch (e.target.value){
            case 'name': {
                loadBooks('_sort=name&_order=asc')
                break
            }
            case 'nameRev': {
                loadBooks('_sort=name&_order=desc')
                break
            }
            case 'count': {
                loadBooks('_sort=pageCount&_order=asc')
                break
            }
            case 'countRev': {
                loadBooks('_sort=pageCount&_order=desc')
                break
            }
            case 'genre': {
                loadBooks('_sort=genre&_order=asc')
                break
            }
            case 'genreRev': {
                loadBooks('_sort=genre&_order=desc')
                break
            }
        }
    }


  return (
    <div className='book__container'>
      <div className='books__control'>
        <Box sx={{minWidth: '250px', maxWidth: '350px', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          {/*<Search color={'primary'} sx={{ mr: 1, my: 0.5 }} />*/}
          <TextField label="Find by name"
                     onChange={(e) => loadBooks(`name_like=${e.target.value}`)}
                     variant="standard"
                     fullWidth
          />
        </Box>
        <TextField select
                   onChange={sort}
                   label="Sort by"
                   defaultValue=''
                   variant="standard"
                   sx={{minWidth: '250px', maxWidth: '350px', width: '100%'}}
        >
          {arr.map((item) => (
              <MenuItem key={item.value}
                        value={item.value}>
                {item.label}
              </MenuItem>
          ))}
        </TextField>
      </div>
      <h2>Total books: {totalBooks}</h2>

      <div className='books__content'>
        {books.map(book => <BookCard key={book.id}
                                     book={book}
        />)}
      </div>

      {totalBooks > limit &&
      <div className='books__pagination'>
                <Pagination variant="outlined"
                            count={pageQty}
                            onChange={(_, number)=> setCurrentPage(number)}
                            page={currentPage}
                            shape="rounded" />
      </div>}

    </div>
  )
}

export default BooksContainer