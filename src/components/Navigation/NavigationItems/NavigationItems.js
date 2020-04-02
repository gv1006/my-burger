import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className='NavigationItems'>
           <NavigationItem link="/" exact>Burger</ NavigationItem>
           <NavigationItem link="/orders">Orders</ NavigationItem>
        </ul>
    );
};
export default navigationItems;