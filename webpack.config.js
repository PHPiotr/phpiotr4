const {resolve} = require('path');
const webpack = require('webpack');
var config = {
    context: resolve(__dirname, 'app'),
    devtool: 'inline-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client',
        resolve(__dirname, 'app/AppContainer.jsx')
    ],
    output: {
        path: resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/javascripts/'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoErrorsPlugin()
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