const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            './app/AppContainer',
        ],
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 4000},
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules'),
        ]),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise',
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: true,
            allChunks: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            raven: null,
        }),
        new Dotenv({
            path: './.env',
            safe: false,
        }),
    ],
};

module.exports = config;

