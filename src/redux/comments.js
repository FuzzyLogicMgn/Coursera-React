import * as ActionTypes from './actionTypes';

export const Comments = (state = { isLoading: true, errMess: null, items: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { isLoading: false, errMess: null, items: action.payload };
        case ActionTypes.COMMENTS_FAILED:
            return { isLoading: false, errMess: action.payload, items: [] };
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log('New comment: ', comment);
            return state.concat(comment);
        default:
            return state;
    }
};