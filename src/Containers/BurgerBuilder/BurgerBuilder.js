import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const INGREDIENT_COST = {
    salad: 0.5,
    bacon: 0.9,
    cheese: 0.6,
    meat:1.4
}

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            meat : 0,
            cheese : 0
        },
        totalCost : 4,
        purchasable : false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }
    addIngredientHandler = (type) => {
        const updateIngredients = {...this.state.ingredients};
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const oldCost = this.state.totalCost;
        const newCost = oldCost + INGREDIENT_COST[type];
        updateIngredients[type] = newCount;
        this.setState({
            totalCost : newCost,
            ingredients: updateIngredients

        });
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0)
        {
            return;
        }
        const newCount = oldCount - 1;
        const oldCost = this.state.totalCost;
        const newCost = oldCost - INGREDIENT_COST[type];
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newCount;
        this.setState({
            totalCost : newCost,
            ingredients: updateIngredients

        });
        this.updatePurchaseState(updateIngredients);
    }
    
    render(){
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Auxi>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler} 
                disabled = {disableInfo}
                price = {this.state.totalCost}
                purchasable={this.state.purchasable}/>
            </Auxi>
        );
    }
}

export default BurgerBuilder;