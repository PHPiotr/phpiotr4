import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers';
console.log('reducers:', reducers);

import {AppContainer} from 'react-hot-loader';

import AppRouter from './AppRouter.jsx';

let store = createStore(reducers);

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

store.subscribe(() => {
    console.log('subscribe: ', store.getState());
    render(AppRouter);
});

render(AppRouter);

if (module.hot) {
    module.hot.accept('./AppRouter.jsx', () => {
        render(AppRouter);
    });
}

