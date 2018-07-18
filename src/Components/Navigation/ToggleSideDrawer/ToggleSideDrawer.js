import React from 'react';
import Styles from './ToggleSideDrawer.css';
const toggleSideDrawer = (props) => (
    <div className={Styles.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default toggleSideDrawer;