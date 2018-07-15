import React from 'react';
import Styles from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'}
]

const buildControls = (props) => (
    <div className={Styles.BuildControls}>
    <p>Current Price : <b>{props.price.toFixed(2)}$</b></p>
    {controls.map(ctrl =>( <BuildControl removed={()=>props.ingredientRemoved(ctrl.type)}
     added={()=>props.ingredientAdded(ctrl.type)} key={ctrl.label} label={ctrl.label} disabled={props.disabled[ctrl.type]}/>
     ))}
    <button className={Styles.OrderButton}>ORDER NOW</button>
    </div>
);

export default buildControls;