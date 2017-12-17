module.exports = {
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