import React, {Component} from "react";
import Styles from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        return(
            <Auxi>    
            <Backdrop show={this.props.show} close={this.props.close}/>    
            <div className={Styles.Modal} style={{
                transform : this.props.show?'translatey(0)':'translateY(-100vh)',
                opacity: this.props.show?'1' :'0'
            }}>
            {this.props.children}
            </div>
            </Auxi>
            )
    }
}

export default Modal;