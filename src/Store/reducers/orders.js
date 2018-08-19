import * as actionVariable from '../actions/actionVariables';

const initialState = {
    orders : [],
    loading : false,
    purchased : false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionVariable.PURCHASE_INIT:
        return{
            ...state,
            purchased : false
        }
        case actionVariable.PURCHASE_BURGER_START : 
        return{
            ...state,
            loading: true
        };
        case actionVariable.PURCHASE_BURGER_SUCCESS : 
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        };
        return{
            ...state,
            loading : false,
            orders : state.orders.concat(newOrder),
            purchased : true
        };
        case actionVariable.PURCHASE_BURGER_FAIL : 
        return{
            ...state,
            loading : false
        };
        case actionVariable.FETCH_ORDER_SUCCESS : 
        return{
            ...state,
            orders : action.orders,
            loading: false
        };
        case actionVariable.FETCH_ORDER_START : 
        return{
            ...state,
            loading: true
        }
        case actionVariable.FETCH_ORDER_FAIL : 
        return{
            ...state,
            loading : false
        }
        default : return state;
    }
};

export default reducer;