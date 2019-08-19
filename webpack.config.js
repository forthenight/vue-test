const path = require('path')


const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	plugins:[
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
        	template:path.join(__dirname,'./src/index.html'),
        	filename:'index.html'
        })

	],
	module:{
		rules:[
          {test:/\.css$/,use:['style-loader','css-loader']},
          {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
          {test:/\.less$/,use:['style-loader','css-loader','less-loader']},


          {test:/\.(jpg|png|bmp|jpeg)$/,use:'url-loader'},
          {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
          {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
          {test:/\.vue$/,use:'vue-loader'}

		]
	},
  resolve:{
    alias:{
      //"vue$":"vue/dist/vue.js"
    }
  }
}