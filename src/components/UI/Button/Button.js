import React from 'react';
import './Button.css';

const button = (props) => (
    <button className={`Button ${props.btnType}`}  onClick={props.action}>
        {props.children}
    </button>
)
export default button;