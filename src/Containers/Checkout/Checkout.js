import React, {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../Containers/Checkout/ContactData/ContactData';

class orderSummary extends Component{
    state={
        ingredients:{
        salad: 1,
        meat: 1,
        cheese:1,
        bacon: 1
    },
    totalCost: 0
}
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price= 0;
        for (let params of query.entries()){
            //[salad,1]        {
                
            if(params[0] === 'price')
            {
                price = params[1];
            }    
            else{
                ingredients[params[0]] = +params[1];
            }
        }
        this.setState({ingredients: ingredients, totalCost: price});
    }
    checkoutCancelled=()=>(
        this.props.history.goBack()
    )
    checkoutContinued=()=>(
        this.props.history.replace('/checkout/contact-data')
    )
    render(){
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
                <Route path={this.props.match.url + '/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalCost} {...props}/>)}/>
            </div>
        )
    }
}

export default orderSummary;