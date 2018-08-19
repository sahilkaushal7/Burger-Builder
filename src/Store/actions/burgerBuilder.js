import * as actionVariable from './actionVariables';
import axios from '../../axios-order';

//action creators for async code
export const addIngredient = (ingName) => {
    return{
        type : actionVariable.ADD_INGREDIENT,
        ingredientName : ingName
    }
}

export const removeIngredient = (ingName) => {
    return{
        type: actionVariable.REMOVE_INGREDIENT,
        ingredientName : ingName
    }
}

export const setIngredients = (ingredients) => {
    return{
        type: actionVariable.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionVariable.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
            axios.get( 'https://react-burger-builder-7af47.firebaseio.com/ingredients.json' )
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    }
}
