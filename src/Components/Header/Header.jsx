import React from 'react'
import {IconButton} from "@mui/material";
import {Menu, Person} from "@mui/icons-material";
import './Header.scss'
import {Link} from "react-router-dom";


const Header = () => {
  return (
    <header>
      <div className='header__container'>
         Library
        <IconButton color="primary" sx={{flexGrow: 1, justifyContent: 'start'}}>
            <Menu/>
        </IconButton>
        <IconButton color="primary">
            <Person/>
        </IconButton>
      </div>
    </header>
  )
}

export default Header