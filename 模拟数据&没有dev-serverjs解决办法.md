## 最新的vue里dev-server.js被替换成了webpack-dev-conf.js被替换成了webpack-dev-conf
    在模拟后台数据的时候直接在webpack-dev-conf.js文件中修改
   1. 在const portfinder = require(‘portfinder’)后添加 
   ```
   //第一步
	const express = require('express')
	const app = express()//请求server
	var appData = require('../data.json')//加载本地数据文件
	var seller = appData.seller//获取对应的本地数据
	var goods = appData.goods
	var ratings = appData.ratings
	var apiRoutes = express.Router()
	app.use('/api', apiRoutes)//通过路由请求数据
	```
	
    2. 找到devServer,在里面加上before（）方法
	```
	devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    //第二步找到devServer,在里面添加
	before(app) {
		app.get('/api/seller', (req, res) => {
		res.json({
		errno: 0,
		data: seller
		})//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
	}),
		app.get('/api/goods', (req, res) => {
		res.json({
		errno: 0,
		data: goods
		})
	}),
	app.get('/api/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    })
  })
}
  }
	```
	PS：

<font color="red">**所有的修改配置都需要重新启动运行命令的：npm run dev才能生效（很重要，否则无法请求到数据）**</font>