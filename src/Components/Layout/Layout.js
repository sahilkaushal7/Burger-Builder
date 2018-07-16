import React from 'react';
import Auxi from '../../hoc/Auxi';
import Styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props) => (
    <Auxi>
    <Toolbar/>
    <main className={Styles.Content}>{props.children}</main>
    </Auxi>
);

export default layout;