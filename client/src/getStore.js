import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import reducers from './reducers';
import { initSagas } from './initSagas';
import createSagaMiddleware from 'redux-saga';


export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];

    const composables = [
        applyMiddleware(...middleWares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ];

    const enhancers = compose(
        ...composables
    );

    const store = createStore(
        reducers,
        enhancers
    );

    initSagas(sagaMiddleware);

    return store;
};



















