import React from 'react';
import foto from '../../../accets/avatar.png'
import './LoginedUser.scss'

const LoginedUser = (props) => {

    const {firstName, lastName, onClick} = props

    return (
        <div className='logined' onClick={onClick}>
            <div className='logined__ava'>
                <img src={foto} alt="foto"/>
            </div>
            <h5>{firstName} {lastName}</h5>
        </div>
    );
};

export default LoginedUser;