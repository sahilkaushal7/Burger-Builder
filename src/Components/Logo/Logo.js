import React from 'react';
import Styles from './Logo.css';
import LogoImage from '../../Assets/Images/127 burger-logo.png' 
const logo = (props) => (
    <div className={Styles.Logo} style={{height:props.height}}>
        <img src={LogoImage} alt='MyBurger'/>
    </div>
);

export default logo;