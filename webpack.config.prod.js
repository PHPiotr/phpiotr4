const webpack = require('webpack');
const path = require('path');

var config = {
    context: path.resolve(__dirname, 'app'),
    devtool: 'inline-source-map',
    entry: {
        app: [
            './AppContainer',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    module: {
        rules: []
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        })
    ]
};

module.exports = config;

