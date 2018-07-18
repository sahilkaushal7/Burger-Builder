import React from 'react';
import Styles from "./SideDrawer.css";
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = (props) => {
    let attachedClasses = [Styles.SideDrawer,Styles.Close];
    if(props.open)
    {
        attachedClasses = [Styles.SideDrawer,Styles.Open];
    }
    return(
    <Auxi>
        <Backdrop show={props.open} close={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <Logo height="11%"/>
        <nav><NavigationItems/></nav>
    </div>
    </Auxi>)
}
    
    

export default sideDrawer;