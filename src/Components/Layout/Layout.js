import React,{Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false});
    }
    toggleSideDrawerHandler = () =>{
        this.setState( (prevState) => {
            return{ showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Auxi>
                <Toolbar clicked={this.toggleSideDrawerHandler}/>
                <SideDrawer  open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={Styles.Content}>{this.props.children}</main>
            </Auxi>
        )
    }
}

export default Layout;