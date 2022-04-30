import React from 'react';
import ReactDOM from 'react-dom';
import LoginState from './Context/Login/Loginstate';
import App from './App'

// import { createStore } from 'redux'
// import allReducers from './reducers'
// import { Provider } from 'react-redux';
// const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // https://tour-explore.herokuapp.com
// store.dispatch()
ReactDOM.render(
  // <Provider store={store}>=
  <LoginState>
    <App />
  </LoginState>
  //  </Provider> 
  ,
  document.getElementById('root')
);

