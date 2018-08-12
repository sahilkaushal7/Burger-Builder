import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../Components/UI/Button/Button';
import Styles from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
class contactData extends Component{
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
        },
        loading : false
    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true})
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredientsFromRedux,
            price:this.props.totalCostFromRedux,
            orderData : formData
        }
        axios.post('orders.json',order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({loading:false})
        });
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
        if(this.state.loading){
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
        ingredientsFromRedux : state.ingredients,
        totalCostFromRedux : state.totalCost
    }
}

export default connect(mapStateToProps)(contactData);