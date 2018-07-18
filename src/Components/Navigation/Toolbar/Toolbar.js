import React from 'react';
import Styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSideDrawer from '../ToggleSideDrawer/ToggleSideDrawer';

const toolbar = (props) => (
    <header className={Styles.Toolbar}>
        <ToggleSideDrawer clicked={props.clicked}/>
        <Logo height="80%"/>
        <nav className={Styles.DesktopOnly}><NavigationItems/></nav>
    </header>
);

export default toolbar;