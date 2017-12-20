const Webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
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
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
        pathinfo: true,
    },
    plugins: [
        new CleanWebpackPlugin(['buildClient/*']),
        new ExtractCssChunks({
            filename: '[name].css',
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],
            filename: '[name].js',
            minChunks: Infinity,
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
        new Webpack.ProvidePlugin({Promise: 'es6-promise-promise'}),
        new Dotenv({path: './.env', safe: false}),
    ],
});