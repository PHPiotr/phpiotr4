const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//const VENDOR_LIBS = ["react","react-dom","react-router","react-tap-event-plugin","es6-promise"];

var config = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        bundle: [
                'react-hot-loader/patch',
                'webpack/hot/only-dev-server',
                'webpack-hot-middleware/client',
                path.resolve(__dirname, 'app/AppContainer.jsx')
            ],
        //vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                include: path.resolve(__dirname, 'app'),
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            },
            comments: false
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    node: {
        fs: "empty"
    }
};

module.exports = config;

