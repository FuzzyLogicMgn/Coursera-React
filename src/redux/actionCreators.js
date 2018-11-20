import * as ActionTypes from './actionTypes';
import fetch  from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
        .then(rs => rs.json())
        .then(comments => dispatch(addComments(comments)));
};
export const addComments = (comments) => ( { type: ActionTypes.ADD_COMMENTS, payload: comments } );
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(rs => rs.json())
        .then(dishes => dispatch(dishesAdd(dishes)));
};
export const dishesLoading = () => ( { type: ActionTypes.DISHES_LOADING } );
export const dishesFailed = (errMess) => ( { type: ActionTypes.DISHES_FAILED, payload: errMess } );
export const dishesAdd = (dishes) => ( { type: ActionTypes.ADD_DISHES, payload: dishes } );


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(rs => rs.json())
        .then(promos => dispatch(promosAdd(promos)));
};
export const promosLoading = () => ( { type: ActionTypes.PROMO_LOADING } );
export const promosFailed = (errMess) => ( { type: ActionTypes.PROMO_FAILED, payload: errMess } );
export const promosAdd = (promos) => ( { type: ActionTypes.ADD_PROMO, payload: promos } );