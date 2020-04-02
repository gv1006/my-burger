import React from 'react';
import './Input.css';

const input = (props) => {
    let classNames = ['InputElement'], validationError = null;
    if(props.invalid && props.shouldValidate && props.touched) {
        validationError = <p className="ValidationError">Please enter a valid value!</p>
        classNames.push('invalid');
    }
    const styleClass = classNames.join(' ');
    let inputElement = null;
    switch(props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={styleClass} {...props.elementConfigs} value={props.value} />
            break
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className = {styleClass} {...props.elementConfigs} value={props.value}/>
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} className = {styleClass} value={props.value}>
                    {props.elementConfigs.options.map(option => <option key={option.value} value={option.value}>{option.displayName}</option>)}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} className={styleClass} {...props.elementConfigs } value={props.value}/>
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;