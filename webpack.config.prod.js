const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
require('babel-polyfill');

module.exports = merge(common, {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_URL': JSON.stringify(process.env.API_URL),
                'API_PREFIX': JSON.stringify(process.env.API_PREFIX),
                'TOKEN_KEY': JSON.stringify(process.env.TOKEN_KEY),
            },
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash].css',
            publicPath: '/',
            disable: false,
            allChunks: true,
        }),
        new UglifyJSPlugin({
            mangle: true,
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
            },
        }),
        new Webpack.optimize.OccurrenceOrderPlugin(true),
        new OptimizeCssAssetsPlugin(),
    ],
});
