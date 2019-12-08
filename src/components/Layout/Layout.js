import React from 'react';
import Aux from '../../Aux copy'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import './Layout.css'

const layout = (props) =>(
    <Aux>
        <Toolbar/>
        <main className={'Content'}>
            {props.children}
        </main>
    </Aux>

)

export default layout;
