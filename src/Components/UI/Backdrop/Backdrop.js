import React from 'react';
import Styles from './Backdrop.css';

const backdrop = (props) => (
    props.show?<div className={Styles.Backdrop} onClick={props.close}></div>:null
);

export default backdrop;