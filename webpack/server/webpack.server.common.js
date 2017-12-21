const Webpack = require('webpack');
const path = require('path');
require('babel-polyfill');

module.exports = {
    context: path.resolve(__dirname, '../../'),
    entry: './server/render.js',
    name: 'server',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: 'css-loader/locals',
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new Webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
};