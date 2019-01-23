import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducers from './reducers';
import { initSagas } from './initSagas';
import reduxThunk from 'redux-thunk';
import { getStore } from './getStore'; 


// const sagaMiddleware = createSagaMiddleware();
// // const middleware = [sagaMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     reducers,
//     /* preloadedState, */
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(sagaMiddleware)
// );

// // initSagas(sagaMiddleware);
const store = getStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
,document.querySelector('#root'));