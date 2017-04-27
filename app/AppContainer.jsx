import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './configureStore';
import {AppContainer} from 'react-hot-loader';
import AppRouter from './AppRouter.jsx';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={configureStore()}>
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

