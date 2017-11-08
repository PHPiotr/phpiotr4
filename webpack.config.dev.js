const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            './app/index.js',
        ],
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
        publicPath: '/',
        pathinfo: true,
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: true,
            allChunks: true,
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
        new Webpack.ProvidePlugin({Promise: 'es6-promise-promise'}),
        new Dotenv({path: './.env', safe: false}),
    ],
});