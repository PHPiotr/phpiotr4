const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const raven = `
<script src="https://cdn.ravenjs.com/3.15.0/raven.min.js" crossorigin="anonymous"></script>
<script>Raven.config('https://f052abfcf71b4b57a8fbe2aac7be8f63@sentry.io/177484').install();</script>
`;

var config = {
    devtool: 'source-map',
    entry: './app/AppContainer',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit: 4000},
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {warnings: false},
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_PREFIX': JSON.stringify('/api/v1'),
                'API_URL': JSON.stringify('https://boo-kings.herokuapp.com'),
                'TOKEN_KEY': JSON.stringify('BEARER_TOKEN'),
            },
        }),
        new OptimizeCssAssetsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash].css',
            disable: false,
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            raven,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
                //     return false;
                // }
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
        }),
    ],
};

module.exports = config;



