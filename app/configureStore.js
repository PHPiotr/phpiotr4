import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const configureStore = () => {
    const middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const store = createStore(
        reducers,
        applyMiddleware(...middlewares)
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;