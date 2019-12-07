import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
]

const builControls = (props) =>(
    <div className={'BuildControls'}>
        {controls.map(ctrl =>(
            <BuildControl key={ctrl.label} label={ctrl.label}  />
        ))}

    </div>
);

export default builControls;