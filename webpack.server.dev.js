const merge = require('webpack-merge');
const common = require('./webpack.server.common.js');
const path = require('path');

module.exports = merge(common, {
    entry: path.resolve(__dirname, './server/render.js'),
});