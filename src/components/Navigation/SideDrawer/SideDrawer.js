import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if(props.open) {
        attachedClasses = ["SideDrawer", "Open"]
    }
    return(
        <Aux>
            <Backdrop show={props.open} onClick={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <div className="logo-c">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;