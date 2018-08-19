import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../Components/UI/Button/Button';
import Styles from './ContactData.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import * as actionVariables from '../../../Store/actions/index';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
class ContactData extends Component{
    state={
        orderForm:{
            name:{
                value:'',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                }
            },
            email:{
                value:'',
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                }
            },
            street:{
                value:'',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                }
            },
            zipCode:{
                value:'',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                }
            },
            city:{
                value:'',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your City'
                }
            },
            deliveryMethod:{
                value:'',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Select Your Delivery Method'},
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                }
            }
        }
    }
    orderHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredientsFromRedux,
            price:this.props.totalCostFromRedux,
            orderData : formData
        }
        this.props.onOrderBurger(order);
        
    }
    inputChangeHandler = (event,elementName) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updateOrderFormElement = {
            ...updateOrderForm[elementName]
        };
        updateOrderFormElement.value = event.target.value;
        updateOrderForm[elementName] = updateOrderFormElement;
        this.setState({
            orderForm : updateOrderForm
        });
    }
        
    render(){
        let formElementsArray = [];
        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            }
            );
        }
        let form = (<form onSubmit={this.orderHandler}>
            {
                formElementsArray.map(formElement=>(
                <Input elementType={formElement.config.elementType} 
                value={formElement.config.value} 
                elementConfig={formElement.config.elementConfig}
                key={formElement.id}
                change={(event) => this.inputChangeHandler(event,formElement.id)}/>))
            }
            <Button btnClass="Success" >Order</Button>
        </form>);
        if(this.props.loading){
            form = <Spinner/>
        }
        return(

            <div className={Styles.ContactData}>
                <h1>Enter your details</h1>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredientsFromRedux : state.burgerBuilder.ingredients,
        totalCostFromRedux : state.burgerBuilder.totalCost,
        loading : state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onOrderBurger : (orderData) => dispatch(actionVariables.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));