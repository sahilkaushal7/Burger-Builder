import React from 'react';
import Auxi from '../../hoc/Auxi';

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
            <p>Proceed to checkout?</p>
        </Auxi>
    )
}

export default orderSummary;