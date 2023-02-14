import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import authReducer from '../auth';
import adminReducer from '../admin';
import etcReducer from '../etc';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: "root",
  storage: storage, // 사용할 스토리지를 정의해요.
  blacklist: [] // 제외 할 데이터를 정의해요
};
const rootReducer = combineReducers({auth:authReducer, admin:adminReducer, etc:etcReducer})

export default persistReducer(persistConfig, rootReducer)
