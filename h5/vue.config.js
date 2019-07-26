module.exports = {
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