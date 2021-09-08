const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
    ],
    output: {
        filename: 'gradtage.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd',
        library: 'Calendar',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "./[name].[ext]"
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};