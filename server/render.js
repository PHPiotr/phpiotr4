import React from 'react';
import {renderToString} from 'react-dom/server';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import universal from 'react-universal-component';
import {StaticRouter as Router} from 'react-router-dom';
import theme from '../app/theme';
import {MuiThemeProvider} from 'material-ui/styles';
import {Provider} from 'react-redux';
import configureStore from '../app/configureStore';
import reducers from '../app/reducers';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import {CookiesProvider} from 'react-cookie';
const App = universal(() => import('../app/components/containers/App'));

export default ({clientStats}) => (req, res) => {
    const sheetsRegistry = new SheetsRegistry();
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;
    const store = configureStore(reducers);
    const preloadedState = store.getState();
    const context = {};
    const app = renderToString(
        <CookiesProvider>
            <Provider store={store}>
                <Router location={req.url} context={context}>
                    <JssProvider registry={sheetsRegistry} jss={jss}>
                        <MuiThemeProvider theme={theme()}>
                            <App/>
                        </MuiThemeProvider>
                    </JssProvider>
                </Router>
            </Provider>
        </CookiesProvider>
    );
    const css = sheetsRegistry.toString();
    const chunkNames = flushChunkNames();
    const {js, cssHash, scripts, stylesheets} = flushChunks(clientStats, {chunkNames, after: ['app']});

    console.log('Chunk names', chunkNames);
    console.log('Scripts', scripts);
    console.log('Styles', stylesheets);

    res.send(`
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${preloadedState.app.appBarTitle}</title>
    </head>
    <body>
        <div id="root">${app}</div>
        <style id="jss-server-side">${css}</style>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${cssHash}
        ${js}
    </body>
</html>
    `);
};