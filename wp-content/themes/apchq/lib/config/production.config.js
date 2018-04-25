const webpack 		= require('webpack');
const path 				= require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.min.css');

module.exports = {
	context: __dirname,

	entry: {
		entry: ["babel-polyfill", "./app.config.js"]
	},

	output: {
		path: path.resolve(__dirname, '../../dist'),
		filename: "bundle.js",
		publicPath: "/dist/"
	},

	module: {
		rules: [
			{
        test : /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ['transform-async-to-generator']
        }
      },
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: extractCSS.extract(['css-loader','sass-loader'])
			},
			{
				test: /\.(eot|svg|ttf|woff|png|jpg|jpeg)/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ['transform-async-to-generator']
        }
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
		}),
		extractCSS
  ],
	watch: true

}
