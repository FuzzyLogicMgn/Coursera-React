import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Comments } from './comments';

export const ConfigureStore = () => {
    return createStore(combineReducers({
        dishes: Dishes,
        promotions: Promotions,
        leaders: Leaders,
        comments: Comments
    }));
};