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
        filename: 'js/bundle.js',
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
                'API_URL': JSON.stringify('https://boo-kings.herokuapp.com'),
                'API_PREFIX': JSON.stringify('/api/v1'),
                'AUTH_SECRET': JSON.stringify('my_secret_passphrase'),
                'TOKEN_EXPIRES_IN': JSON.stringify('1440'),
                'TOKEN_KEY': JSON.stringify('BEARER_TOKEN')
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};

module.exports = config;



