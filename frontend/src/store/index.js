import { configureStore } from '@reduxjs/toolkit';
import persistReducer from './module/index'


const store = configureStore({
  reducer: persistReducer,
});

export default store;
