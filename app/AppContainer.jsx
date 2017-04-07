import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers';
console.log('reducers:', reducers);

import {AppContainer} from 'react-hot-loader';

import AppRouter from './AppRouter.jsx';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={createStore(reducers)}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(AppRouter);

if (module.hot) {
    module.hot.accept('./AppRouter.jsx', () => {
        render(AppRouter);
    });
}

