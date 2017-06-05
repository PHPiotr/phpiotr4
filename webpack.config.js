const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

var config = {
    context: path.resolve(__dirname, 'app'),
    devtool: 'inline-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            './AppContainer',
        ],
        vendor: [
            "babel-polyfill",
            "bootstrap-css",
            "cookie-monster",
            "history",
            "hoist-non-react-statics",
            "moment",
            "react",
            "react-addons-css-transition-group",
            "react-addons-update",
            "react-css-modules",
            "react-dnd",
            "react-dnd-html5-backend",
            "react-dom",
            "react-router",
            "socket.io-client",
            "whatwg-fetch"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader',
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 4000}
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new Dotenv({
            path: './.env',
            safe: false
        })
    ]
};

module.exports = config;

