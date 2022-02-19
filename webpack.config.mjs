import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';

const root = dirname(fileURLToPath(import.meta.url));

const config = {
	mode: 'development',

	resolve: {
		extensions: [ '.js', '.jsx' ],
	},

	module: {
		rules: [ {
			test: /\.jsx?$/i,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[ '@babel/preset-react', { runtime: 'automatic' } ],
					],
				},
			},
		} ],
	},
};

export default [ {
	...config,
	name: 'browser',
	entry: `./browser.js`,
	output: {
		path: `${root}/dist/browser`,
		publicPath: '/',
	},
}, {
	...config,
	name: 'server',
	entry: './server.js',
	target: 'node',
	output: {
		path: `${root}/dist/server`,
	},
	externals: [ nodeExternals() ],
} ];
