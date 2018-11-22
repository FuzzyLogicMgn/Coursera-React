import * as ActionTypes from './actionTypes';

export const Comments = (state = { isLoading: true, errMess: null, items: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { isLoading: false, errMess: null, items: action.payload };
        case ActionTypes.COMMENTS_FAILED:
            return { isLoading: false, errMess: action.payload, items: [] };
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            console.log('New comment: ', comment);
            return { ...state, items: state.items.concat(comment) };
        default:
            return state;
    }
};