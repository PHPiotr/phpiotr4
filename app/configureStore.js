import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV === 'production') {
        return createStore(
            reducers,
            applyMiddleware(...middlewares)
        );
    }
    middlewares.push(createLogger());
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore();