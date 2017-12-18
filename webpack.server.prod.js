const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.server.common.js');
require('babel-polyfill');

module.exports = merge(common, {
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
    ],
});
