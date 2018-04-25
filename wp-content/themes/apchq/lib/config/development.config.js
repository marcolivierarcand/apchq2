const webpack 		= require('webpack');
const path 				= require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var ReloadPlugin = require('reload-html-webpack-plugin')

module.exports = {
	context: __dirname,
	devServer: {
	   port: 8080,
	   contentBase: './',
	   watchContentBase: true
	},

	entry: {
		entry: ["babel-polyfill", "./app.config.js"]
	},

	output: {
		path: path.resolve(__dirname, '../../dist'),
		filename: "bundle.js",
		publicPath: "/dist/"
	},

	module: {
		loaders: [
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
				loader: 'style-loader!css-loader!sass-loader!postcss-loader?parser=postcss-scss'
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
		new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
        port: 8080,
				files: "*",
				reload: true,
				notify: false,
        proxy: 'http://localhost:8080/',
      },
      {
				files: "*",
        reload: true
      }
    ),
		new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
		})
  ],
	watch: true

}
