import React from 'react';
import {hydrate, render as ReactDOMRender} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'isomorphic-fetch';
import configureStore from './configureStore';
import reducers from './reducers';
import App from './components/containers/App';
import 'typeface-roboto';
import {MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';
import {CookiesProvider} from 'react-cookie';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(reducers, preloadedState);

const init = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('SW registered: ', registration);
            }).catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
};

init();

try {
    injectTapEventPlugin();
} catch (e) {
    //
}

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
    render = App => ReactDOMRender(<AppContainer>{app(App)}</AppContainer>, document.getElementById(ROOT));
    module.hot && module.hot.accept('./components/containers/App', () => {
        render(require('./components/containers/App').default);
    });
}
render(App);