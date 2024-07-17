import { combineReducers } from 'redux';
import { actionTypes } from './actionCreators';

const initialState = {
    activeCardType: '',
    data: null,
    currentType: ''
};

const buttonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_CARD:
            return {
                ...state,
                activeCardType: action.payload.cardType,
                data: action.payload.data
            };
        case actionTypes.SET_CURRENT_TYPE:
            return {
                ...state,
                currentType: action.payload
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    button: buttonReducer
});

export default rootReducer;