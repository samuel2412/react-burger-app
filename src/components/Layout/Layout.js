import React from 'react';
import Aux from '../../Aux copy'


const layout = (props) =>(
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main>
            {props.children}
        </main>
    </Aux>

)

export default layout;
