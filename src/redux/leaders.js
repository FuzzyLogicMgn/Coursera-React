import * as ActionTypes from './actionTypes';

export const Leaders = (state = { isLoading: true, errMess: null, items: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return { isLoading: false, errMess: null, items: action.payload };
        case ActionTypes.LEADERS_LOADING:
            return { isLoading: true, errMess: null, items: [] };
        case ActionTypes.LEADERS_FAILED:
            return { isLoading: false, errMess: action.payload, items: [] };
        default:
            return state;
    }
};