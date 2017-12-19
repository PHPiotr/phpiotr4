const path = require('path');
require('babel-polyfill');

module.exports = {
    entry: path.resolve(__dirname, './server/render.js'),
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
};