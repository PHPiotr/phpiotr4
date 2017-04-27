import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import reducers from './reducers';

const configureStore = () => {
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        reducers,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;