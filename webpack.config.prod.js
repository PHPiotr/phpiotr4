var config = require('./webpack.config'),
    webpack = require('webpack');

config.plugins.push(new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

module.exports = config;