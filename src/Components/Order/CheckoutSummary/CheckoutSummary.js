import React from 'react';
import Styles from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const checkoutSummary= (props) => (
    <div className={Styles.CheckoutSummary}>
        <h2>Hope it tastes well!! ;)</h2>
        <Burger ingredients={props.ingredients}/>
        <Button btnClass="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
        <Button btnClass="Success" clicked={props.checkoutContinued}>Continue</Button>
    </div>
)

export default checkoutSummary