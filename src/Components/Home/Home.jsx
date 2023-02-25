import React, {useEffect, useState} from 'react';
import LeftPanel from "../LeftPanel/LeftPanel";
import AuthorCard from "../UI/AuthorCard/AuthorCard";
import axios from "axios";
import {url} from "../App/App";
import Container from "../Container/Container";
import './Home.scss'
import BooksContainer from "../BooksContainer/BooksContainer";
import {logDOM} from "@testing-library/react";

const Home = () => {


    const [authors, setAuthors] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('')

    useEffect(()=>{
        axios.get(url+'authors').then((resp)=>{
            setAuthors(resp.data);
        })
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
                />)}
            </LeftPanel>
            <BooksContainer authorId={selectedAuthor}/>
        </Container>
    );
};

export default Home;