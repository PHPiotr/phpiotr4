const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const path = require('path');
const context = common.context;

module.exports = merge(common, {
    entry: path.resolve(context, './app/index.js'),
    output: {
        path: path.resolve(context, 'buildClient'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new ExtractCssChunks({
            filename: '[name].[chunkhash].css',
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],
            filename: 'js/[name].[chunkhash].js',
            minChunks: Infinity,
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(context, 'app/static/img'), to: 'static/img'},
        ], {
            copyUnmodified: true,
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_URL': JSON.stringify(process.env.API_URL),
                'API_PREFIX': JSON.stringify(process.env.API_PREFIX),
                'TOKEN_KEY': JSON.stringify(process.env.TOKEN_KEY),
            },
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
    ],
});
