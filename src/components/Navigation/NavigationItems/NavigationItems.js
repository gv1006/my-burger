import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className='NavigationItems'>
           <NavigationItem link="/" active>Burger</ NavigationItem>
           <NavigationItem link="/checkout">Checkout</ NavigationItem>
        </ul>
    );
};
export default navigationItems;