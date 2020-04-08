import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css'

const toolbar = (props) => {
    console.log(props);
    return (
        <header className='Toolbar'>
            <div onClick={props.menuClicked}>MENU</div>
            <div className="logo-container">
                <Logo />
            </div>
            <div className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuth}/>
            </div>
        </header>
    );
};

export default toolbar;