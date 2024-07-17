import { combineReducers } from 'redux';
import { actionTypes } from './actionCreators';

// Define initial state
const initialState = {
    activeCardType: null,
    data: null
};

// Define the buttonReducer
const buttonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_CARD:
            return {
                ...state,
                activeCardType: action.payload.cardType,
                data: action.payload.data
            };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    button: buttonReducer,
    // Add other reducers here
});

export default rootReducer;
