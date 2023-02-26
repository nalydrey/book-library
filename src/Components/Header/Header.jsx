import React from 'react'
import {IconButton} from "@mui/material";
import {Menu} from "@mui/icons-material";
import './Header.scss'
import {Link} from "react-router-dom";
import LoginMenu from "../UI/LoginMenu/LoginMenu";
import UserMenu from "../UI/UserMenu/UserMenu";
import {useSelector} from "react-redux";
import {showHideLeftPanel} from "../../store/action_creators/actionCreatorLeftControl";


const Header = () => {

    const currentUser = useSelector(state => state.currentUser)
    const {isOpen} = useSelector(state => state.leftPanel)


    const controlMenu = (e) => {
        e.stopPropagation()
        showHideLeftPanel(!isOpen)
    }

  return (
    <header>
      <div className='header__container'>
         <Link to='.'>Library</Link>

          <div className='header__action'>
              <div className='menu__button'>
                  <IconButton color="primary"
                              onClick={controlMenu}
                  >
                      <Menu/>
                  </IconButton>
              </div>

              {currentUser ?
                  <UserMenu firstName={currentUser.firstName}
                            lastName={currentUser.lastName}
                  />
                  :
                  <LoginMenu />}
          </div>

      </div>
    </header>
  )
}

export default Header