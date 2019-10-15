import React from 'react';
import ReactDom from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducer from './state';

import App from './App';

const store = createStore(appReducer, applyMiddleware(reduxThunk));

ReactDom.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));
