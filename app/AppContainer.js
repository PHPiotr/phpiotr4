import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './AppRouter';
import App from './App';

if (process.env.NODE_ENV === 'development') {
    let render = (Component) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={configureStore}>
                    <Router>
                        <App>
                            <Component/>
                        </App>
                    </Router>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    };

    render(AppRouter);

    if (module.hot) {
        module.hot.accept();
    }
} else {
    let render = (Component) => {
        ReactDOM.render(
            <Provider store={configureStore}>
                <Router>
                    <App>
                        <Component/>
                    </App>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    };

    render(AppRouter);
}

