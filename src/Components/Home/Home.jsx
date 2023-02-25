import React, {useEffect, useState} from 'react';
import LeftPanel from "../LeftPanel/LeftPanel";
import AuthorCard from "../UI/AuthorCard/AuthorCard";
import axios from "axios";
import {url} from "../App/App";
import Container from "../Container/Container";
import './Home.scss'
import BooksContainer from "../BooksContainer/BooksContainer";

const Home = () => {


    const [authors, setAuthors] = useState([])

    useEffect(()=>{
        axios.get(url+'authors').then((resp)=>{
            setAuthors(resp.data);
        })
    }, [])

    return (
        <Container>
            <LeftPanel>
                <div className='author'>
                    <button className='show__all'>Show all books</button>
                </div>
                {authors.map(author => <AuthorCard author={author}
                                                   key={author.id}
                />)}
            </LeftPanel>
            <BooksContainer>

            </BooksContainer>
        </Container>
    );
};

export default Home;