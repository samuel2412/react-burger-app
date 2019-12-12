import React from 'react';
import './Button.css';

const button = (props) => (
    <button 
    className={`Button ${props.btnType}`}
    disabled={props.disabled}
    onClick={props.action}>
        {props.children}
    </button>
)
export default button;