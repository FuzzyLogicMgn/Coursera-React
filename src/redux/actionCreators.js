import * as ActionTypes from './actionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const dishesLoading = () => (
    { type: ActionTypes.DISHES_LOADING }
);
export const dishesFailed = (errMess) => (
    { type: ActionTypes.DISHES_FAILED, payload: errMess }
);
export const dishesAdd = (dishes) => (
    { type: ActionTypes.ADD_DISHES, payload: dishes }
);

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(() => { dispatch(dishesAdd(DISHES)) }, 2000);
};