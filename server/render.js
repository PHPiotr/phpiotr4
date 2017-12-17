import React from 'react';
import ReactDOM from 'react-dom/server';
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

export default ({clientStats}) => (req, res) => {
    const store = configureStore(reducers);
    const preloadedState = store.getState();
    const context = {};
    const app = ReactDOM.renderToString(
        <Provider store={store}>
            <Router location={req.url} context={context}>
                <MuiThemeProvider theme={theme}>
                    <App>
                        <Routes/>
                    </App>
                </MuiThemeProvider>
            </Router>
        </Provider>
    );
    const chunkNames = flushChunkNames();

    const {js, styles, cssHash, scripts, stylesheets} = flushChunks(clientStats, {chunkNames});

    console.log('Dynamic Chunk Names Rendered', chunkNames);
    console.log('Scripts', scripts);
    console.log('Styles', stylesheets);

    res.send(`
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Universal testing</title>
        ${styles}
        <link href="/app.css" rel="stylesheets" />
    </head>
    <body>
        <div id="root">${app}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${cssHash}
        ${js}
        <script type='text/javascript' src='/app.js' defer></script>
    </body>
</html>
    `);
};