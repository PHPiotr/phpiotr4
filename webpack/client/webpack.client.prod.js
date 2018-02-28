const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const path = require('path');
const context = common.context;

module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: path.resolve(context, './app/index.js'),
    },
    output: {
        path: path.resolve(context, 'buildClient'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.NamedChunksPlugin((chunk) => {
            if (chunk.name) {
                return chunk.name;
            }
            return chunk.mapModules(m => path.relative(m.context, m.request)).join('_');
        }),
        new NameAllModulesPlugin(),
        new CopyWebpackPlugin([
            {from: path.resolve(context, 'app/static/img'), to: 'static/img'},
        ], {
            copyUnmodified: true,
        }),
        new Webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify(process.env.API_URL),
                'API_PREFIX': JSON.stringify(process.env.API_PREFIX),
                'TOKEN_KEY': JSON.stringify(process.env.TOKEN_KEY),
            },
        }),
    ],
});
