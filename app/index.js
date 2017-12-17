import React from 'react';
import {hydrate} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'isomorphic-fetch';
import Routes from './routes';
import configureStore from './configureStore';
import reducers from './reducers';
import App from './components/containers/App';
import 'typeface-roboto';
import {MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';

const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(reducers, preloadedState);

try {
    injectTapEventPlugin();
} catch (e) {
    //
}

const rootElementIdAttr = 'root';

const app = () => (
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <App>
                    <Routes/>
                </App>
            </MuiThemeProvider>
        </Router>
    </Provider>
);
let render;
if (process.env.NODE_ENV === 'production') {
    render = () => {
        hydrate(app(), document.getElementById(rootElementIdAttr));
    };
} else {
    render = () => {
        hydrate(
            <AppContainer>
                {app()}
            </AppContainer>
            , document.getElementById(rootElementIdAttr));

        if (module.hot) {
            module.hot.accept();
        }
    };
}

render();