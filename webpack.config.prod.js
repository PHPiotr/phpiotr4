const webpack = require('webpack');
const path = require('path');

var config = {
    context: path.resolve(__dirname, 'app'),
    devtool: 'source-map',
    entry: {
        app: [
            './app/AppContainer',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            { test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/ },
            { test: /\.scss?$/,
                loader: 'style!css!sass!less',
                include: path.join(__dirname, 'app', 'css', 'styles') },
            { test: /\.png$/,
                loader: 'file' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'}
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};

module.exports = config;

