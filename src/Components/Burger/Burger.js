import React from 'react';
import Styles from './Burger.css';
import BurgerIngredients from './BugerIngredients/BurgerIngredients';
const burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients).map(
        igkeys => {
            return [...Array(props.ingredients[igkeys])].map((_,i) => {
                return <BurgerIngredients key={igkeys + i} type={igkeys}/>
            })
        }
    ).reduce((arr,cr)=>{
        return arr.concat(cr)
    },[]);
    if(transformedIngredients.length === 0)
       { transformedIngredients = <p>Please Start Adding Ingredients</p>}
    return(
        <div className={Styles.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}

export default burger;