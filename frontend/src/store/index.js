import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import etcReducer from './etc';

const store = configureStore({
  reducer: {  auth: authReducer, etc: etcReducer},
});

export default store;
