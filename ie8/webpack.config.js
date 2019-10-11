let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    optimization: {
        minimizer: [new UglifyjsWebpackPlugin({
            uglifyOptions: {
                ie8: true,
                compress: {
                    drop_console: true
                },
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                }
            }
        })]
    },
    devServer: {
        contentBase: './dist',
        https: false,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:46054/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ang\.html$/,
                loader: path.resolve(__dirname, 'src/common/static-loader/angular-loader.js'),
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|gif|png|xml)$/,
                loader: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                exclude: /(\.ang\.html|index\.html)$/,
                loader: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?v=[hash]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',//模板文件
            filename: 'index.html',//输出文件名
            minify: {
                collapseWhitespace: true //压缩换行，注意，有些标签<pre>压缩换行后会出问题的。
            },
            hash: true //对js添加hash参数，避免更新代码后使用缓存
        })
    ]
}