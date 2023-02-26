import React, {useState} from 'react';
import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {AccountBox, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {exitUser} from "../../../store/action_creators/actionCreatorCurrentUser";
import LoginedUser from "../LoginedUser/LoginedUser";

const UserMenu = (props) => {


    const {firstName, lastName} = props

    const navigate = useNavigate()


    const [anchorEl, setAnchoreEl] = useState(null)
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const closeMenu = () => {
        setIsOpenMenu(false)
    }

    const goToOffice = () => {
        navigate('office')
        closeMenu()
    }

    const exitAccount = () => {
        closeMenu()
        localStorage.removeItem('currentAuthor')
        navigate('.')
        exitUser()
    }

    const openMenu = (e) => {
        setAnchoreEl(e.currentTarget)
        setIsOpenMenu(true)
    }

    return (
        <>
            <LoginedUser firstName={firstName}
                         lastName={lastName}
                         onClick={openMenu}
            />

            <Menu anchorEl={anchorEl}
                  open={isOpenMenu}
                  onClose={closeMenu}
            >
                <MenuItem onClick={goToOffice}>
                    <ListItemIcon>
                        <AccountBox fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Go to office</ListItemText>
                </MenuItem>
                <MenuItem onClick={exitAccount}>
                    <ListItemIcon>
                        <Logout fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText>Exit</ListItemText>
                </MenuItem>
            </Menu>


        </>
    );
};

export default UserMenu;