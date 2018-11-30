import { createStore } from 'redux';
import myReducer from '../reducers/index.js';
import { Provider } from 'react-redux';
const store = createStore(myReducer);

export default store;