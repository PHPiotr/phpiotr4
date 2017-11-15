import React from 'react';
import {render as reactRender} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'isomorphic-fetch';
import Routes from './routes';
import store from './configureStore';
import App from './components/containers/App';
import 'typeface-roboto';
import {MuiThemeProvider} from 'material-ui/styles';
import theme from './theme';

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
        reactRender(app(), document.getElementById(rootElementIdAttr));
    };
} else {
    render = () => {
        reactRender(
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