import * as actionVariable from '../actions/actionVariables';
import {updateObject} from '../utility';
const initialState = {
    ingredients : null,
    totalCost : 4, 
    error: false 
};

const INGREDIENT_COST = {
    salad: 0.5,
    bacon: 0.9,
    cheese: 0.6,
    meat:1.4
};

const rootReducer = (state=initialState,action) => {
        switch(action.type){
            case actionVariable.ADD_INGREDIENT : {
                const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
                const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
                const updatedState={
                ingredients : updatedIngredients,
                totalCost : state.totalCost + INGREDIENT_COST[action.ingredientName]
                };
                return updateObject(state,updatedState);
            }
            case actionVariable.REMOVE_INGREDIENT : {
                const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
                const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
                const updatedState={
                ingredients : updatedIngredients,
                totalCost : state.totalCost - INGREDIENT_COST[action.ingredientName]
                };
                return updateObject(state,updatedState);
            }
            case actionVariable.SET_INGREDIENT : {
                return{
                    ...state,
                    ingredients : action.ingredients,
                    totalCost : 4,
                    error : false
                }
            }
            case actionVariable.FETCH_INGREDIENT_FAILED : {
                return{
                    ...state,
                    error : true
                }
            }
            default : return state
    }
}

export default rootReducer;