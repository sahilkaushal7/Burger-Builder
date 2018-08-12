import * as actionVariable from './actionVariables';
const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        cheese : 0,
        meat : 0,
    },
    totalCost : 4,  
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
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                    },
                    totalCost : state.totalCost + INGREDIENT_COST[action.ingredientName]

                }
            }
            case actionVariable.REMOVE_INGREDIENT : {
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                    },
                    totalCost : state.totalCost - INGREDIENT_COST[action.ingredientName]
            }
            
        }
            default : return state
    }
}

export default rootReducer;