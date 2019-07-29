const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
	configureWebpack:config=>{
		return {
			plugins:[new CompressionWebpackPlugin({
				test:/\.js$|\.html$|\.css/,
				threshold:10240,
				deleteOriginalAssets:true,
			})]
		};
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