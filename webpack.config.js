const path = require('path');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output:
	{
		// filename: 'main.js',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer:
	{
		static: './dist',
	},
	module:
	{
		rules: [
		{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.(png|svg|jpg|jpeg|gif)$/i,
			type: 'asset/resource',
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource',
		},
		{
			test: /\.(csv|tsv)$/i,
			use: ['csv-loader'],
		},
		{
			test: /\.xml$/i,
			use: ['xml-loader'],
		}, ],
	},
};
