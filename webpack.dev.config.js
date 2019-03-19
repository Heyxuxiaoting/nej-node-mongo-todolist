const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, './client/build'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/tpl/index.html',
            filename: 'index.html'
        }),
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            ['import', [{ libraryName: "antd", style: 'css' }]]]
                    }
                },
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                }],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },{
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')(),
                            require('precss')(),
                            require('postcss-flexbugs-fixes')()
                        ]
                    }
                }],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './client/build'),
        hot: true,
        port: 6613,
        proxy: {
            '/todo': {
                target: 'http://localhost:6612'
            }
        }
    }
};