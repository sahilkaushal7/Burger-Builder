import React from 'react';
import Auxi from '../../hoc/Auxi';
import Styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
const layout = (props) => (
    <Auxi>
    <Toolbar/>
    <SideDrawer/>
    <main className={Styles.Content}>{props.children}</main>
    </Auxi>
);

export default layout;