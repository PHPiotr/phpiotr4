const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    devtool: 'eval',
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
        path: path.resolve(__dirname, './buildClient'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/static/',
        //pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ExtractCssChunks.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            //localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
                    },
                }),
            },
        ],
    },
    plugins: [
        new ExtractCssChunks({
            filename: '[name].css',
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].css',
        //     disable: false,
        //     allChunks: true,
        // }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
        new Webpack.ProvidePlugin({Promise: 'es6-promise-promise'}),
        new Dotenv({path: './.env', safe: false}),
    ],
});