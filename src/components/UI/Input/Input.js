import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    switch(props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className="InputElement" {...props.elementConfigs} value={props.value} />
            break
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className = "InputElement" {...props.elementConfigs} value={props.value}/>
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} className = "InputElement" value={props.value}>
                    {props.elementConfigs.options.map(option => <option key={option.value} value={option.value}>{option.displayName}</option>)}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} className="InputElement" {...props.elementConfigs } value={props.value}/>
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;