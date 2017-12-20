const Webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
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
        new Dotenv({path: './.env', safe: false}),
    ],
});