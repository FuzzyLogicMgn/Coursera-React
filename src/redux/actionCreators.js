import * as ActionTypes from './actionTypes';
import fetch  from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
        .then(handleRs, handleErr)
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};
export const addComments = (comments) => ( { type: ActionTypes.ADD_COMMENTS, payload: comments } );
export const commentsFailed = (errMess) => ( { type: ActionTypes.COMMENTS_FAILED, payload: errMess } );
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
        date: new Date().toISOString()
    };
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "content-type": 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(handleRs, handleErr)
        .then(comm => dispatch(addComment(comm)))
        .catch(err => {
            console.log('Error on post comment: ', err.message);
            alert('Sorry, some problem happen. Can not post a comment.');
        });
};


export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(handleRs, handleErr)
        .then(dishes => dispatch(dishesAdd(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ( { type: ActionTypes.DISHES_LOADING } );
export const dishesFailed = (errMess) => ( { type: ActionTypes.DISHES_FAILED, payload: errMess } );
export const dishesAdd = (dishes) => ( { type: ActionTypes.ADD_DISHES, payload: dishes } );


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(handleRs, handleErr)
        .then(promos => dispatch(promosAdd(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};
export const promosLoading = () => ( { type: ActionTypes.PROMO_LOADING } );
export const promosFailed = (errMess) => ( { type: ActionTypes.PROMO_FAILED, payload: errMess } );
export const promosAdd = (promos) => ( { type: ActionTypes.ADD_PROMO, payload: promos } );


function handleRs(response) {
    if (response.ok) {
        return response.json();
    } else {
        const error = new Error('Error: ' + response.status + ' - ' + response.statusText);
        error.response = response;
        throw error;
    }
};

function handleErr(err) {
    throw new Error(err.message);
};