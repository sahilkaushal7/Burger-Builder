import React from 'react';
import Styles from './Button.css';

const button = (props) => (
    <button className={[Styles.Button,Styles[props.btnClass]].join(' ')} onClick={props.clicked}>{props.children}</button>
);

export default button;