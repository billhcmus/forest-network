import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'
import 'antd/dist/antd.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);;


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
