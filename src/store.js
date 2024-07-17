import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // No need for enhancers, Redux Toolkit integrates Redux DevTools by default
});

export default store;
