import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import './Backdrop.css'

const backdrop = (props) => {
    return (
        <Aux>
            {props.show ? <div className='Backdrop' onClick={props.onClick}></div> : null}
        </Aux>
    )
};

export default backdrop;
