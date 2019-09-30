const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
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
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',//path为相对于context的路径
                        context: 'src',
                        publicPath: function (url) {//返回最终的资源相对路径
                            return path.relative(__dirname, url).replace(/\\/g, '/');
                        }
                    }
                }]
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            jQuery:'jquery',
            $:'jquery',
        }),
    ],
    devServer:{	
		https: false,
		compress: true,
		proxy:{
			'/api':{
				target:'http://localhost:46054/',
				ws:true,
				changOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};