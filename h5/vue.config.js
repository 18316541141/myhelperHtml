const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
	productionSourceMap: process.env.NODE_ENV !== 'production',
	configureWebpack:config=>{
		if(process.env.NODE_ENV === 'production'){
			return {
				plugins:[new CompressionWebpackPlugin({
					test:/\.js$|\.html$|\.css$|\.tff$|\.woff$/,
					threshold:10240,
					deleteOriginalAssets:false,
				}),new UglifyjsWebpackPlugin({
					uglifyOptions: {
						compress: {
							drop_debugger: true,
							drop_console: true,
						},
					},
					sourceMap: false,
					parallel: true,
				})]
			};
		}else{
			return {devtool: 'source-map'};
		}
	},
	publicPath:'/',
	devServer:{	
		https: false,
		compress: true,
		proxy:{
			'/api':{
				target:'http://localhost:8088/',
				ws:true,
				changOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};