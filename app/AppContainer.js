import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './configureStore';
import {AppContainer} from 'react-hot-loader';
import AppRouter from './AppRouter';

if (process.env.NODE_ENV === 'development') {
    let render = (Component) => {
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
        module.hot.accept('./AppRouter', () => {
            render(AppRouter);
        });
    }
} else {
    let render = (Component) => {
        ReactDOM.render(
                <Provider store={configureStore()}>
                    <Component/>
                </Provider>,
            document.getElementById('root')
        );
    };

    render(AppRouter);
}

