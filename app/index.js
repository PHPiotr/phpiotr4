import React from 'react';
import {hydrate, render as ReactDOMRender} from 'react-dom';
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

const ROOT = 'root';

const app = App => (
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
    render = App => hydrate(app(App), document.getElementById(ROOT));
} else {
    render = App => ReactDOMRender(<AppContainer>{app(App)}</AppContainer>, document.getElementById(ROOT));
    if (module.hot) {
        module.hot.accept('./components/containers/App', () => {
            render(require('./components/containers/App').default);
        });
    }
}
render(App);