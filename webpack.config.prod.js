const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var config = {
    context: path.resolve(__dirname, 'app'),
    devtool: 'source-map',
    entry: './AppContainer',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader',
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 4000}
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {
            warnings: false
        }}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_PREFIX': JSON.stringify('/api/v1'),
                'API_URL': JSON.stringify('https://boo-kings.herokuapp.com'),
                'TOKEN_KEY': JSON.stringify('BEARER_TOKEN')
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash].css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
};

module.exports = config;



