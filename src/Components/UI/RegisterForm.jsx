import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Dialog, DialogActions, DialogTitle, Grid, TextField} from "@mui/material";
import {
    checkRegForm,
    clearRegForm,
    fillRegForm,
    showHideRegForm
} from "../../store/action_creators/actioncCreatorRegForm";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import {url} from "../App/App";
import {useNavigate} from "react-router-dom";
import {enterUser} from "../../store/action_creators/actionCreatorCurrentUser";

const RegisterForm = () => {

    const fields = [
        {
            label: 'First Name',
            name: 'firstName',
            help: 'Enter your name',
            isError: false
        },
        {
            label: 'Fathers Name',
            name: 'fathersName',
            help: '',
            isError: false
        },
        {
            label: 'Last Name',
            name: 'lastName',
            help: 'Enter your last name',
            isError: false
        }
    ]

    const initialErrors = {
        firstName: false,
        lastName:false,
        fathersName: false,
        born: false
    }

    const currentUser = useSelector(state => state.currentUser)
    const form = useSelector(state => state.regForm)
    // const regForm = useSelector(state => state.regForm)
    const navigate = useNavigate()
    // const [value, setValue] =useState(null)

    const [validStatus, setValidStatus] = useState(initialErrors)

    const cancelForm = () => {
        showHideRegForm(false)
        clearRegForm()
        setValidStatus({...initialErrors})
    }

    const fillForm = (text, fieldName) => {
        !text && setValidStatus({...validStatus, [fieldName] : true})
        (validStatus[fieldName] && !!text) && setValidStatus({...validStatus, [fieldName] : false})
        fillRegForm(text, fieldName)
        checkRegForm()
    }
    const register = () => {
        setValidStatus({
            ...validStatus, firstName: !form.firstName, lastName: !form.lastName
        })

        if(form.isValid){
            const authorId = uuidv4()
            axios.post(url+`authors`, {
                id: authorId,
                isAdmin: false,
                firstName: form.firstName,
                fathersName: form.fathersName,
                lastName: form.lastName,
                born: form.born,
            }).then(resp => {
                localStorage.setItem('currentAuthor', authorId)
                enterUser(resp.data)
                navigate('office')
            })
            cancelForm()
        }


    }
    const edit = () => {
        console.log('!!!')
        if(form.isValid) {
            axios.put(url+`authors/${currentUser.id}`,
                {...currentUser, firstName: form.firstName,
                                      lastName: form.lastName,
                                      fathersName: form.fathersName,
                                      born: form.born
                }).then(resp => enterUser(resp.data))
                cancelForm()
        }
    }



    return (
        <Dialog open={form.isOpen}>
            <DialogTitle>
                {form.isEdit ? "Edit" : "Register"}
            </DialogTitle>
            <Grid container spacing={2}
                  sx={{p:2}}
            >
                {fields.map(field =>
                <Grid item xs={6} key={field.name}>
                    <TextField fullWidth
                               variant="outlined"
                               label={field.label}
                               error = {validStatus[field.name]}
                               helperText={validStatus[field.name] && field.help}
                               onChange={(e)=> fillForm(e.target.value, field.name)}
                               value={form[field.name]}
                    />
                </Grid>
                )}
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            inputFormat="DD.MM.YYYY"
                            views={['day', 'month','year' ]}
                            label="Birthday date"
                            value={form.born}
                            onChange={(newValue) => {
                                fillForm(newValue.format('DD.MM.YYYY'), 'born');
                            }}
                            renderInput={(params) =>  <TextField {...params} sx={{width: '100%'}} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={cancelForm}>Cancel</Button>
                {form.isEdit ?
                    <Button onClick={edit}>Edit</Button>
                    :
                    <Button onClick={register}>Register</Button>}
            </DialogActions>

        </Dialog>
    );
};

export default RegisterForm;