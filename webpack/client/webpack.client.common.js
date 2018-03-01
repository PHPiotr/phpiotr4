require('babel-polyfill');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    context: path.resolve(__dirname, '../../'),
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
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
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