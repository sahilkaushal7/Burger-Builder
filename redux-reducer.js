const redux  = require('redux');
const createStore = redux.createStore;

//state
const initialState = {
    counter: 0
}
// reducer
const rootReducer = (state=initialState,action) => {
    if(action.type === 'ADD_COUNTER' ){
        return{
            ...state,
            counter : state.counter + action.value
        }
    }
    if(action.type === 'INC_COUNTER' ){
        return{
            ...state,
            counter : state.counter + 1
        }
    }
    return state
}
//store
const store = createStore(rootReducer);
console.log(store.getState());
//subscription
store.subscribe(()=>{
    console.log('[Subscription]', store.getState() );
});
// dispacting action
store.dispatch({type:'ADD_COUNTER', value: 10});
console.log(store.getState());
store.dispatch({type:'INC_COUNTER'});
console.log(store.getState());
