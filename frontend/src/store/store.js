import { createStore } from 'redux';
import reducer from './user/reducer';


const store = createStore(reducer);
export default store;