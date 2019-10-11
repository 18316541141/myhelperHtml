let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
let webpack = require('webpack')
module.exports = smart(base,{
    mode: 'development',
    devServer: {
        contentBase: './dist',
        https: false,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:46054/',
                ws: false,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }, 
    plugins: [
        new webpack.DefinePlugin({
            PROXY:'"/api"'
        }),
    ]
});