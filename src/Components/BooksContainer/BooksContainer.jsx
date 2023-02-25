import React, {useEffect, useState} from 'react'
import BookCard from "../UI/BookCard/BookCard";
import axios from "axios";
import {url} from "../App/App";
import './BooksContainer.scss'
import {Box, MenuItem, TextField} from "@mui/material";
import * as PropTypes from "prop-types";

function Search(props) {
    return null;
}

Search.propTypes = {
    color: PropTypes.string,
    sx: PropTypes.shape({mr: PropTypes.number, my: PropTypes.number})
};
const BooksContainer = () => {

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

    useEffect(()=>{
        axios.get(url+`books?_limit=${limit}`).then(resp => {
          const totalBooks = +resp.headers['x-total-count']
          setTotalBooks(totalBooks)
          console.log(totalBooks)
          setBooks(resp.data)
            }
        )
    }, [])

  return (
    <div className='book__container'>
      <div className='books__control'>
        <Box sx={{minWidth: '250px', maxWidth: '350px', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <Search color={'primary'} sx={{ mr: 1, my: 0.5 }} />
          <TextField label="Find by name"
                     // onChange={search}
                     variant="standard"
                     fullWidth
          />
        </Box>
        <TextField select
                   // onChange={sort}
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

      <div className='books__pagination'>
           {/*{totalBooks > limit &&*/}
           {/*     <Pagination onChange={(_, number)=> pagination(number)}*/}
           {/*                 count={pageQty}*/}
           {/*                 variant="outlined"*/}
           {/*                 page={currentPage}*/}
           {/*                 shape="rounded" />}*/}
      </div>

    </div>
  )
}

export default BooksContainer