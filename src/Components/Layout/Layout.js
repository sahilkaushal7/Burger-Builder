import React from 'react';
import Auxi from '../../hoc/Auxi';
import Styles from './Layout.css';

const layout = (props) => (
    <Auxi>
    <div>SideDrawer,Toolbar,Backdrop</div>
    <main className={Styles.Content}>{props.children}</main>
    </Auxi>
);

export default layout;