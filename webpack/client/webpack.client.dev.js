const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const context = common.context;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            path.resolve(context, './app/index.js'),
        ],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
        pathinfo: true,
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Dotenv({path: path.resolve(context, './.env'), safe: false}),
    ],
});