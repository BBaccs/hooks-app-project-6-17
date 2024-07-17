import { combineReducers } from 'redux';

// Example slice reducer
const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      return { ...state, example: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here
});

export default rootReducer;
