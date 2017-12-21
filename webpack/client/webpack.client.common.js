const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
require('babel-polyfill');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../../'),
    entry: {
        vendor: [
            'isomorphic-fetch',
            'jwt-decode',
            'material-ui',
            'material-ui-icons',
            'moment',
            'prop-types',
            'react',
            'react-cookie',
            'react-dom',
            'react-hot-loader',
            'react-redux',
            'react-router-dom',
            'react-tap-event-plugin',
            'react-universal-component',
            'redux',
            'redux-thunk',
            'typeface-roboto',
        ],
    },
    name: 'client',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
                        },
                    },
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            fallback: 'file-loader',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'static/fonts/[name].[ext]' },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ManifestPlugin(),
    ],
};