const merge = require('webpack-merge');
const common = require('./webpack.server.common.js');
const path = require('path');
const Webpack = require('webpack');

module.exports = merge(common, {
    entry: path.resolve(__dirname, './server/render.js'),
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
        }),
    ],
});