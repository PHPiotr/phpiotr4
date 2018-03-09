import React from 'react';
import {hydrate} from 'react-dom';
import {AppContainer, setConfig} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import 'isomorphic-fetch';
import configureStore from './configureStore';
import reducers from './reducers';
import 'typeface-roboto';
import {MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';
import {CookiesProvider} from 'react-cookie';
import universal from 'react-universal-component';
const App = universal(() => import('./components/containers/App'));

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(reducers, preloadedState);

const ROOT = 'root';

const app = App => (
    <CookiesProvider>
        <Provider store={store}>
            <Router>
                <MuiThemeProvider theme={theme()}>
                    <App/>
                </MuiThemeProvider>
            </Router>
        </Provider>
    </CookiesProvider>
);
let render;
if (process.env.NODE_ENV === 'production') {
    render = App => hydrate(app(App), document.getElementById(ROOT));
} else {
    setConfig({logLevel: 'debug'});
    render = App => hydrate(<AppContainer>{app(App)}</AppContainer>, document.getElementById(ROOT));
    module.hot && module.hot.accept('./components/containers/App', () => {
        render(require('./components/containers/App').default);
    });
}
render(App);