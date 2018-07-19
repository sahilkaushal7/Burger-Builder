import React,{Component} from 'react';
import Auxi from '../Auxi';
import axios from 'axios';
import Modal from '../../Components/UI/Modal/Modal';
const withErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req}
                )
            axios.interceptors.response.use(res =>res,error => {
                    this.setState({error:error});
            })
        }
        errorConfirmHandler=()=> {
            this.setState({error:null});
        }
        render(){
            return(
                <Auxi>
                    <Modal show={this.state.error} close={this.errorConfirmHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxi>
            )
        }
    }
}

export default withErrorHandler;