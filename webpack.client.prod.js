const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const path = require('path');
require('babel-polyfill');

module.exports = merge(common, {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'buildClient'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: ExtractCssChunks.extract({
            //         use: ['style-loader', 'css-loader'],
            //     }),
            // },
        ],
    },
    plugins: [
        new ExtractCssChunks(),
        new Webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],
            filename: 'js/[name].[chunkhash].js',
            minChunks: Infinity,
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'app/static/img'), to: 'static/img'},
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
