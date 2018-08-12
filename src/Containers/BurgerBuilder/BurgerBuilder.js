import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from "react-redux";
import * as actionVariable from "../../Store/actionVariables";

class BurgerBuilder extends Component{
    state = {
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
        return sum > 0; 
    }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    closeBackdropHandler = () => {
        this.setState({purchasing:false});
    }
    onOrderRecieveHandler = () => {
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo = {...this.props.ingredientsFromRedux};
        for(let key in disableInfo)
        {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null; 
        let burger = this.state.error?<p style={{textAlign:'center'}}>Ingredients can't be loaded</p>:<Spinner/>
        if(this.props.ingredientsFromRedux)
        {
            burger = (<Auxi>
                <Burger ingredients={this.props.ingredientsFromRedux}/>
                <BuildControls ingredientAdded = {this.props.addIngredientHandlerFromRedux} 
                ingredientRemoved = {this.props.removeIngredientHandlerFromRedux} 
                disabled = {disableInfo}
                price = {this.props.totalCostFromRedux}
                purchasable={this.updatePurchaseState(this.props.ingredientsFromRedux)}
                ordering = {this.purchaseHandler}/>
            </Auxi>);
            orderSummary=<OrderSummary ingredients={this.props.ingredientsFromRedux} cancel={this.closeBackdropHandler}
            continue={this.onOrderRecieveHandler} price={this.props.totalCostFromRedux}/>
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
const mapStateWithProps = state=> {
    return{
        ingredientsFromRedux : state.ingredients,
        totalCostFromRedux : state.totalCost
    };  
}
const mapDispatchToProps = dispatch => {
    return{
        addIngredientHandlerFromRedux : (ingName) => dispatch({type:actionVariable.ADD_INGREDIENT,ingredientName : ingName}),
        removeIngredientHandlerFromRedux : (ingName) => dispatch({type:actionVariable.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateWithProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));