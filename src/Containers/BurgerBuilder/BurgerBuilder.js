import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        purchasable : false,
        purchasing : false,
        loading : false
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
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    closeBackdropHandler = () => {
        this.setState({purchasing:false});
    }
    onOrderRecieveHandler = () => {
        this.setState({loading:true})
        const order = {
            ingrdients: this.state.ingredients,
            price:this.state.totalCost,
            customer:{
                name:'Sahil Kaushal',
                email:'sahilkaushal2013@gmail.com',
                address:{
                    street:'Hitech Theatre Lane',
                    zipCode:'500018',
                    city:'Hyderabad'
                }
            },
            deliveryMethod:'SuperFast'
        }
        axios.post('orders.json',order)
        .then(response=>{
            this.setState({loading:false,purchasing:false})
        })
        .catch(error=>{
            this.setState({loading:false,purchasing:false})
        })
    }
    render(){
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} cancel={this.closeBackdropHandler}
        continue={this.onOrderRecieveHandler} price={this.state.totalCost}/>
        if(this.state.loading)
        {
            orderSummary = <Spinner/>
        }
        return(
            <Auxi>
                <Modal show={this.state.purchasing} close={this.closeBackdropHandler}>
                {orderSummary}    
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler} 
                disabled = {disableInfo}
                price = {this.state.totalCost}
                purchasable={this.state.purchasable}
                ordering = {this.purchaseHandler}/>
            </Auxi>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);