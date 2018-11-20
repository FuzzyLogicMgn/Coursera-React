import * as ActionTypes from './actionTypes';

export const Promotions = (state = { isLoading: true, errMess: null, items: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMO:
            return { isLoading: false, errMess: null, items: action.payload };
        case ActionTypes.PROMO_LOADING:
            return { isLoading: true, errMess: null, items: [] };
        case ActionTypes.PROMO_FAILED:
            return { isLoading: false, errMess: action.payload, items: [] };
        default:
            return state;
    }
};