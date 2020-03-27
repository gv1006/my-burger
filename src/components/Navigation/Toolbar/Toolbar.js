import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css'

const toolbar = (props) => {
    return (
        <header className='Toolbar'>
            <div onClick={props.menuClicked}>MENU</div>
            <div className="logo-container">
                <Logo />
            </div>
            <div className="DesktopOnly">
            <NavigationItems />
            </div>
        </header>
    );
};

export default toolbar;