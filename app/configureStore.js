import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = (reducers, preloadedState) => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV === 'production') {
        return createStore(
            reducers,
            preloadedState,
            applyMiddleware(...middlewares)
        );
    }
    middlewares.push(createLogger());
    const store = createStore(
        reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
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