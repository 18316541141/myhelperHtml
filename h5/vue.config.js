const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
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
			return {};
		}
	},
	publicPath:'/',
	productionSourceMap: false,
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