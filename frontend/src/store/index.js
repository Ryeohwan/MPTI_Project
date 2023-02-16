import { configureStore } from '@reduxjs/toolkit';
import persistReducer from './module/index'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: persistReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
