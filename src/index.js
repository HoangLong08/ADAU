import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import reportWebVitals from './reportWebVitals';

import myReducer from './redux/reducers';
import mySaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const myStore = createStore(myReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// <React.StrictMode></React.StrictMode>
sagaMiddleware.run(mySaga);
ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();