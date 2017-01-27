const { resolve } = require('path');
const webpack = require('webpack');
var config = {
    devtool: 'inline-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?http://localhost:3000',
        __dirname + '/app/main.jsx'
    ],
    output: {
        path: __dirname + "/public/javascripts/",
        filename: "bundle.js",
        publicPath: "/javascripts/"
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }]
    },
    devServer: {
        hot: true,
        contentBase: "./public",
        inline: true,
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
//        new webpack.NoErrorsPlugin()
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
}

module.exports = config;