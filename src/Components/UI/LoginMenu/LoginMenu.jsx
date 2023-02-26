import React, {useEffect, useState} from 'react';
import {url} from "../../App/App";
import axios from "axios";
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {AccountBox, AccountCircle, Login} from "@mui/icons-material";
import {showHideRegForm} from "../../../store/action_creators/actioncCreatorRegForm";
import {enterUser} from "../../../store/action_creators/actionCreatorCurrentUser";
import {useNavigate} from "react-router-dom";

const LoginMenu = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    useEffect(()=>{
        axios.get(url+`authors`).then(resp => {
            setUsers(resp.data)
        })
    },[])

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget)
        setIsOpenMenu(true)
    }

    const openRegForm = () => {
        showHideRegForm(true)
        setIsOpenMenu(false)
    }

    const selectAuthor = (userId) => {
        axios.get(url+`authors/${userId}`).then(resp => {
            enterUser(resp.data)
            localStorage.setItem('currentAuthor', userId)
            navigate('office')
        })
    }


    return (
        <>
            <IconButton color="primary"
                        onClick={openMenu}
            >
                <AccountCircle />
            </IconButton>

            <Menu anchorEl={anchorEl}
                  open={isOpenMenu}
                  onClose={()=>setIsOpenMenu(false)}
            >
                <MenuItem onClick={openRegForm}>
                    <ListItemIcon>
                        <Login fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                </MenuItem>
                {users.map(user => (
                <MenuItem key={user.id}
                          onClick={()=>selectAuthor(user.id)}
                >
                    <ListItemIcon>
                        <AccountBox fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>{user.firstName} {user.lastName}</ListItemText>
                </MenuItem>
                ) )}
            </Menu>
        </>
    );
};

export default LoginMenu;