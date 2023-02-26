import React, {useEffect, useState} from 'react';
import LeftPanel from "../LeftPanel/LeftPanel";
import AuthorCard from "../UI/AuthorCard/AuthorCard";
import axios from "axios";
import {url} from "../App/App";
import Container from "../Container/Container";
import './Home.scss'
import BooksContainer from "../BooksContainer/BooksContainer";
import {logDOM} from "@testing-library/react";
import {showHideLeftPanel} from "../../store/action_creators/actionCreatorLeftControl";

const Home = (props) => {

    const {refreshBooks} = props

    const [authors, setAuthors] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('')
    const [refresh, setRefresh] = useState (false)
    const [refreshUsers, setRefreshUsers] = useState (false)

    useEffect(()=>{
        axios.get(url+'authors').then((resp)=>{
            setAuthors(resp.data);
        })
    }, [refreshUsers])


    useEffect(()=>{
        showHideLeftPanel(false)
    }, [])

    return (
        <Container>
            <LeftPanel>
                <div className='author'>
                    <button className='show__all' onClick={()=>setSelectedAuthor('')}>Show all books</button>
                </div>
                {authors.map(author => <AuthorCard author={author}
                                                   key={author.id}
                                                   onClick={(id)=>setSelectedAuthor(id)}
                                                   refreshCount={refresh}
                                                   afterDeleteUser = {()=>setRefreshUsers(!refreshUsers)}
                />)}
            </LeftPanel>
            <BooksContainer authorId={selectedAuthor}
                            afterLoadBooks={()=>{setRefresh(!refresh)}}
                            refreshBooks={refreshBooks}
            />
        </Container>
    );
};

export default Home;