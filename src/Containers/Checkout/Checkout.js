import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../Containers/Checkout/ContactData/ContactData';

class orderSummary extends Component{

    checkoutCancelled=()=>(
        this.props.history.goBack()
    )
    checkoutContinued=()=>(
        this.props.history.replace('/checkout/contact-data')
    )
    render(){
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <CheckoutSummary ingredients={this.props.ingredientsFromRedux} checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredientsFromRedux : state.ingredients,
    }
}

export default connect(mapStateToProps)(orderSummary);