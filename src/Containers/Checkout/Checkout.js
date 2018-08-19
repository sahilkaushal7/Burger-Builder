import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../../Containers/Checkout/ContactData/ContactData';

class orderSummary extends Component{
    checkoutCancelled=()=>(
        this.props.history.goBack()
    )
    checkoutContinued=()=>(
        this.props.history.replace('/checkout/contact-data')
    )
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ingredientsFromRedux){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                {purchasedRedirect}    
                <CheckoutSummary 
                ingredients={this.props.ingredientsFromRedux} 
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
                </div>)
        }
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredientsFromRedux : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(orderSummary);