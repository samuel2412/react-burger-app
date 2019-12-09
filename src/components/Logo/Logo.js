import React from 'react';
import './Logo.css';
import burgerLogo from '../../assets/images/logo.png'

const logo = (props) =>(
    <div className={'Logo'} style={{height: props.height, marginBottom: props.bottom}}>
        <img src={burgerLogo} />
    </div>
)
export default logo;