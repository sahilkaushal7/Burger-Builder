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
        ingredients : null,
        totalCost : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
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
        
        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalCost);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search : '?' + queryString
        });
    }
    componentDidMount() {
        axios.get('https://react-burger-builder-7af47.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
        .catch(error=>{
            this.setState({error:true})
        })
    }
    render(){
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null; 
        let burger = this.state.error?<p style={{textAlign:'center'}}>Ingredients can't be loaded</p>:<Spinner/>
        if(this.state.ingredients)
        {
            burger = (<Auxi>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler} 
                disabled = {disableInfo}
                price = {this.state.totalCost}
                purchasable={this.state.purchasable}
                ordering = {this.purchaseHandler}/>
            </Auxi>);
            orderSummary=<OrderSummary ingredients={this.state.ingredients} cancel={this.closeBackdropHandler}
            continue={this.onOrderRecieveHandler} price={this.state.totalCost}/>
        }
        if(this.state.loading)
        {
            orderSummary = <Spinner/>
        }
        return(
            <Auxi>
                <Modal show={this.state.purchasing} close={this.closeBackdropHandler}>
                {orderSummary}    
                </Modal>
                {burger}
            </Auxi>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);