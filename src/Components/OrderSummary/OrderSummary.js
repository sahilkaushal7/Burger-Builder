import React from 'react';
import Auxi from '../../hoc/Auxi';
import Button from '../UI/Button/Button'; 

const orderSummary = (props) => {
    const selectedIngredients = Object.keys(props.ingredients).map(igkeys=>{
        return <li key={igkeys}><span style={{textTransform:'capitalize'}}>{igkeys}</span> : {props.ingredients[igkeys]}</li>
    });

    return(
        <Auxi>
            <h3>A delicious burger with the following ingredients : </h3>
            <ul>
                {selectedIngredients}
            </ul>
            <b>TOTAL COST : </b>{props.price.toFixed(2)}$
            <p>Proceed to checkout?</p>
            <Button btnClass='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnClass='Success' clicked={props.continue}>CONTINUE</Button>
        </Auxi>
    )
}

export default orderSummary;