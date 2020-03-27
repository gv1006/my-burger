import React from 'react';
import myLogo from '../../../assets/images/logo.png';
import './Logo.css';

const logo = (props) => {
    return (
        <div className='Logo'>
            <img src={myLogo} alt="myBurger" />
        </div>
    );
}

export default logo;