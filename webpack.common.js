const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /(node_modules|build)/,
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
                        options: {
                            limit: 4000,
                            fallback: 'file-loader',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
            {
                test: /\.(otf|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'static/fonts/[name].[ext]' },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['build/*']),
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                if (module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
    ],
};