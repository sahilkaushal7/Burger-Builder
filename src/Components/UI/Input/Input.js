import React from "react";
import Styles from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch(props.elementType){
        case( 'input' ):
            inputElement = <input onChange={props.change}  {...props.elementConfig} 
            className={Styles.InputElement} 
            value={props.value} required/>;
            break;
        case('select'):
            inputElement = <select required
            onChange={props.change} 
            className={Styles.InputElement}
            value={props.value}>
            {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>  
            break;
        default:
            inputElement = <input onChange={props.change} {...props.elementConfig} 
            className={Styles.InputElement}
            value={props.value}/>;
    }
    return(
        <div className={Styles.Input}>
            <label className={Styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;