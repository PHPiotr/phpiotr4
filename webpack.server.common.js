const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './server/render.js'),
    name: 'server',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: 'css-loader/locals',
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs2',
    },
};