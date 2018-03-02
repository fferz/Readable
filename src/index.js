import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

//const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose


const store = createStore(
    reducer, 
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        {/*Tell the Router to use our enhanced history */}
        <Router>
            <Route path="/" component={App} />
        </Router> 
    </Provider>, document.getElementById('root'));
registerServiceWorker();
