import React from "react";
import Styles from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) =>{
    return(
    <Auxi>    
    <Backdrop show={props.show} close={props.close}/>    
    <div className={Styles.Modal} style={{
        transform : props.show?'translatey(0)':'translateY(-100vh)',
        opacity: props.show?'1' :'0'
    }}>
    {props.children}
    </div>
    </Auxi>
    )
}

export default modal;