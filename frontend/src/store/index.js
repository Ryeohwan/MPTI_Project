import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import adminReducer from './admin';
import etcReducer from './etc';

const store = configureStore({
  reducer: {  auth: authReducer, etc: etcReducer, admin:adminReducer},
});

export default store;
