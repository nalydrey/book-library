import React, {useEffect, useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogTitle, Grid, MenuItem, Snackbar, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {
    checkBookForm,
    clearBookForm,
    fillBookForm,
    showHideBookForm
} from "../../store/action_creators/actionCreatorBookForm";
import axios from "axios";
import {url} from "../App/App";
import {v4 as uuidv4} from 'uuid'

const BookForm = (props) => {


    const initErrors = {
        name: false,
        genre: false,
        pages: false,
        dialog: false,
    }

    const [errorState, setErrorState] = useState(initErrors)

    const {addHandler = () => {}} = props
    //
    // const bookForm = useSelector(state => state.bookForm)
    const form = useSelector(state => state.bookForm)
    const author = useSelector(state => state.currentUser)
    const [isOpenSecMod, setOpenSecMod] = useState(false)
    // const [isError, setError] = useState (false)
    const [genreText, setGenreText] = useState('')
    const [genre, setGenre] = useState([])
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackStatus, setSnackStatus] = useState('warning')
    const [snackText, setSnackText] = useState('The same genre!')

    useEffect(()=>{
        axios.get(url+`genre`).then(resp => setGenre(resp.data.map(el => el.name)))
    },[])
    //
    //
    const cancelForm = () => {
        console.log('cancel')
        showHideBookForm(false)
        setErrorState(initErrors)
        clearBookForm()
    }

    const validForm = () => {
        setErrorState({
            ...errorState, name: !form.name, genre: !form.genre, pages: !form.pages
        })
    }
    const addbook = () => {
        if(form.isValid){
            const bookId =uuidv4()
            axios.post(url+'books', {
                id: bookId,
                author: author.id,
                name: form.name,
                pageCount: form.pages,
                genre: form.genre
            }).then(resp => {
                addHandler()
                snackHandl('Book added!', 'success')
            })
            cancelForm()
        }
        else {
            snackHandl('Book did not add', 'error')
            validForm()
        }
    }
    const edit = () => {
        console.log(form)
        if(form.isValid) {
            axios.put(url+`books/${form.id}`, {
                genre:form.genre,
                name: form.name,
                pageCount: form.pages,
                author: form.author
            }).then(resp => {
                addHandler()
                snackHandl('Book changed!', 'success')
            })
            cancelForm()
        }
    }

    const addGenre = () => {
        if (!genreText){
            setErrorState({...errorState, dialog: true})
        }
        else{
            if(genre.some(el => el === genreText)){
                snackHandl('The same book', 'warning')
            }
            else{
                axios.post(url+'genre', {name: genreText})
                setGenre([...genre, genreText])
                setGenreText('')
                setOpenSecMod(false)
                fillBookForm(genreText, 'genre')
            }
        }
    }

    const fillForm = (text, fieldName) => {
        errorState[fieldName] && text && setErrorState({...errorState, [fieldName]: false})
        !errorState[fieldName] && !text && setErrorState({...errorState, [fieldName]: true})
        fillBookForm(text, fieldName)
        checkBookForm()
    }

    const fillSecondModal = (e) => {
        // setError(false)
        errorState.dialog && e.target.value && setErrorState({...errorState, dialog: false})
        !errorState.dialog && !e.target.value && setErrorState({...errorState, dialog: true})
        setGenreText(e.target.value)
    }
    const closeModal = () => {
        setOpenSecMod(false)
        setGenreText('')
        setErrorState({...errorState, dialog: false})
    }

    const snackHandl = (text, status) => {
        setSnackText(text)
        setSnackStatus(status)
        setSnackOpen(true)

    }

    return (
        <>
            <Dialog  open={form.isOpen}>
                <DialogTitle>
                    {form.isEdit ? "Edit book" : "Add book"}
                </DialogTitle>
                <Grid container spacing={2}
                      sx={{p:2}}
                >
                    <Grid item xs={6} >
                        <TextField fullWidth
                                   variant="outlined"
                                   label='Book name'
                                   error = {errorState.name}
                                   helperText={errorState.name && 'Add book Name'}
                                   onChange={(e)=> fillForm(e.target.value, 'name')}
                                   value={form.name}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth
                                   type='number'
                                   variant="outlined"
                                   label='Total pages'
                                   error = {errorState.pages}
                                   helperText={errorState.pages && 'Add pages'}
                                   onChange={(e)=> fillForm(+e.target.value, 'pages')}
                                   value={form.pages}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField  fullWidth
                                    select
                                    error = {errorState.genre}
                                    helperText={errorState.genre && form.genre}
                                    label="Genre"
                                    value={form.genre}
                                    variant={'outlined'}
                                    onChange={(e)=>{fillForm(e.target.value, 'genre')}}
                        >
                            {genre.map((el) => (
                                <MenuItem key={el} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6} sx={{alignSelf: 'end'}}>
                        <Button fullWidth
                                variant='outlined'
                                onClick={() => setOpenSecMod(true)}
                        >Add genre</Button>
                    </Grid>
                    <DialogActions sx={{ flexGrow: 1, justifyContent: 'center', mt: 2}}>
                        <Button onClick={cancelForm}>Cancel</Button>
                        {form.isEdit ?
                            <Button   onClick={edit}>Edit</Button>
                            :
                            <Button  onClick={addbook}>Add book</Button>}
                    </DialogActions >
                </Grid>
            </Dialog>

            <Dialog open={isOpenSecMod}
                    onClose={closeModal}
            >
                <DialogActions sx={{flexDirection: 'column', p: 5, pt: 2, pb: 2, gap: 5}}>
                    <TextField fullWidth
                               variant="standard"
                               label='Add genre'
                               error = {errorState.dialog}
                               helperText={errorState.dialog && 'Add genre'}
                               onChange={fillSecondModal}
                               value={genreText}
                               sx={{width: '400px'}}
                    />
                    <div>
                        <Button onClick={addGenre}
                                variant='outlined'
                        >Add new genre</Button>
                    </div>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackOpen}
                      autoHideDuration={3000}
                      onClose={()=>setSnackOpen(false)}
            >
                <Alert onClose={()=>setSnackOpen(false)}
                       severity={snackStatus} sx={{ width: '100%' }}
                >
                    {snackText}
                </Alert>
            </Snackbar>
        </>

    );
};

export default BookForm;