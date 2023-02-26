import React, {useEffect, useState} from 'react';
import './Office.scss'
import Container from "../Container/Container";
import LeftPanel from "../LeftPanel/LeftPanel";
import BooksContainer from "../BooksContainer/BooksContainer";
import {useSelector} from "react-redux";
import foto from '../../accets/avatar.png'
import {Button} from "@mui/material";
import {showHideLeftPanel} from "../../store/action_creators/actionCreatorLeftControl";
import {showHideBookForm} from "../../store/action_creators/actionCreatorBookForm";
import {showHideRegForm} from "../../store/action_creators/actioncCreatorRegForm";
import axios from "axios";
import {url} from "../App/App";
import {exitUser} from "../../store/action_creators/actionCreatorCurrentUser";
import {useNavigate} from "react-router-dom";



const Office = (props) => {

    const {refreshBooks} = props
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.currentUser)

    useEffect(()=>{
        showHideLeftPanel(false)
    }, [])

    const editData = () => {
        showHideRegForm(true, true)
    }
    const addBook = () => {
        showHideBookForm(true)
    }
    const deleteProfile = () => {
        axios.delete(url+`authors/${currentUser.id}`).then(resp => {
            localStorage.removeItem('currentAuthor')
            exitUser()
            navigate('..')
        })
    }

    const buttons = [
        {
            name: 'Edit profile',
            func: editData
        },
        {
            name: 'Add book',
            func: addBook
        }

    ]

    return (
        <Container>
            <LeftPanel>
                <div className='office__avatar'>
                    <img src={foto} alt="foto"/>
                </div>
                {currentUser &&
                    <>
                        <h2>{currentUser.lastName} {currentUser.firstName} {currentUser.fathersName}</h2>
                        <h3>{currentUser.born}</h3>
                    </>
                }
                { buttons.map(button =>
                    <Button variant="outlined"
                            onClick={button.func}
                            fullWidth
                            key={button.name}
                    >
                        {button.name}
                    </Button>
                    )}
                {currentUser && !currentUser.isAdmin &&
                <Button variant="outlined"
                        onClick={deleteProfile}
                        fullWidth
                >
                    Delete profile
                </Button>}
            </LeftPanel>
            {currentUser &&
            <BooksContainer authorId={currentUser.id}
                            refreshBooks={refreshBooks}
            />}
        </Container>
    );
};

export default Office;