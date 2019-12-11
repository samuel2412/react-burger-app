import React from 'react';
import {Link} from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = (props) => (
    <li className={'NavigationItem'}>
       <Link to={props.link} className={props.active ? 'active' : null}>
            {props.children}
        </Link>
    </li>
)
export default navigationItem;