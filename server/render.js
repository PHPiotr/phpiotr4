import React from 'react';
import {renderToString} from 'react-dom/server';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../app/components/containers/App';
import {StaticRouter as Router} from 'react-router-dom';
import theme from '../app/theme';
import Routes from '../app/routes';
import {MuiThemeProvider} from 'material-ui/styles';
import {Provider} from 'react-redux';
import configureStore from '../app/configureStore';
import reducers from '../app/reducers';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

export default ({clientStats}) => (req, res) => {
    const sheetsRegistry = new SheetsRegistry();
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;
    const store = configureStore(reducers);
    const preloadedState = store.getState();
    const context = {};
    const app = renderToString(
        <Provider store={store}>
            <Router location={req.url} context={context}>
                <JssProvider registry={sheetsRegistry} jss={jss}>
                    <MuiThemeProvider theme={theme()}>
                        <App>
                            <Routes/>
                        </App>
                    </MuiThemeProvider>
                </JssProvider>
            </Router>
        </Provider>
    );
    const css = sheetsRegistry.toString();
    const chunkNames = flushChunkNames();

    const {js, cssHash, scripts, stylesheets} = flushChunks(clientStats, {chunkNames});

    let appScript = '';
    if (process.env.NODE_ENV === 'development') {
        appScript = '<script type="text/javascript" src="/app.js" defer></script>';
    }

    console.log('Chunk names', chunkNames);
    console.log('Scripts', scripts);
    console.log('Styles', stylesheets);

    res.send(`
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${preloadedState.appReducer.appBarTitle}</title>
    </head>
    <body>
        <div id="root">${app}</div>
        <style id="jss-server-side">${css}</style>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${cssHash}
        ${js}
        ${appScript}
    </body>
</html>
    `);
};