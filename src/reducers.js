import { combineReducers } from 'redux';
import LoadingSpinner from './LoadingSpinner';
import ErrorComponent from './ErrorComponent';
import CharacterCard from './CharacterCard';
import TitanCard from './TitanCard';
import LocationCard from './LocationCard';
import OrganizationCard from './OrganizationCard';
import EpisodeCard from './EpisodeCard';
import { SET_ACTIVE_CARD } from './actionCreators';

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


const rootReducer = combineReducers({
    example: exampleReducer,
});

export default rootReducer;
