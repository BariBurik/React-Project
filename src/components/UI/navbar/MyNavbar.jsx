import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import classes from './MyNavbar.module.css'
import * as ReactRouteDOM from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";

const MyNavbar = ({current_url}) => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={classes.navbar}>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div>
                <Link className={classes.navbar__link} to="/about">О нас</Link>
            </div>
            <div>
                <Link className={classes.navbar__link} to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default MyNavbar;