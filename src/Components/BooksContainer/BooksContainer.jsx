import React, {useEffect, useState} from 'react'
import BookCard from "../UI/BookCard/BookCard";
import axios from "axios";
import {url} from "../App/App";
import './BooksContainer.scss'
import {Box, MenuItem, Pagination, TextField} from "@mui/material";
import * as PropTypes from "prop-types";


const BooksContainer = (props) => {

    const {authorId='', refreshBooks, afterLoadBooks=()=>{}} = props


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

    const initState = {
        searchString: '',
        sortString: ''
    }

    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [pageQty, setPageQty] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setString] = useState(initState)
    const [refresh, setRefresh] = useState(false)



    const loadBooks = () =>{
        axios.get(url+`books?${authorId&&`author=${authorId}`}&_limit=${limit}&_page=${currentPage}&_sort=${query.sortString}&name_like=${query.searchString}`)
            .then(resp => {
                const totalBooks = +resp.headers['x-total-count']
                const pages = Math.ceil(totalBooks/limit)
                setTotalBooks(totalBooks)
                setPageQty(pages)
                setBooks(resp.data)
                afterLoadBooks()

            }
        )
    }

    useEffect(()=>{
        loadBooks()
    }, [currentPage, authorId, query.searchString, query.sortString, refreshBooks, refresh])

    const afterDelete = () => {
        setRefresh(!refresh)
        books.length===1 && currentPage!==1 && setCurrentPage(currentPage-1)

    }

    const sort = (e) => {
        console.log(e.target.value)
        switch (e.target.value){
            case 'name': {
                setString({...query, sortString: 'name&_order=asc'})
                break
            }
            case 'nameRev': {
                setString({...query, sortString: 'name&_order=desc'})
                break
            }
            case 'count': {
                setString({...query, sortString: 'pageCount&_order=asc'})
                break
            }
            case 'countRev': {
                setString({...query, sortString: 'pageCount&_order=desc'})
                break
            }
            case 'genre': {
                setString({...query, sortString: 'genre&_order=asc'})
                break
            }
            case 'genreRev': {
                setString({...query, sortString: 'genre&_order=desc'})
                break
            }
        }
    }


  return (
    <div className='book__container'>
      <div className='books__control'>
        <Box sx={{minWidth: '250px', maxWidth: '350px', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <TextField label="Find by name"
                     onChange={(e) => setString({...query, searchString: e.target.value})}
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
                                     loadBooks={afterDelete}
        />)}
      </div>

      {totalBooks > limit &&
      <div className='books__pagination'>
                <Pagination variant="outlined"
                            count={pageQty}
                            onChange={(_, number)=> setCurrentPage(number)}
                            page={currentPage}
                            shape="rounded"
                />
      </div>}

    </div>
  )
}

export default BooksContainer