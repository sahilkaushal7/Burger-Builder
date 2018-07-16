import React from 'react';
import Styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <header className={Styles.Toolbar}>
        <div>Menu</div>
        <Logo height="80%"/>
        <nav className={Styles.DesktopOnly}><NavigationItems/></nav>
    </header>
);

export default toolbar;