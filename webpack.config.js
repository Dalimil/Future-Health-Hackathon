const path = require('path');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, './www'), // absolute path
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			// Webpack should run sources through Babel when it bundles them
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["latest"]
				}
			},
			// CSS modules
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	}
}
