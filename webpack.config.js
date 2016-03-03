var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = process.argv.join('').indexOf('hot') > -1;

var metadata = {
    title: 'Angular2 Colour wheel palette by vianch',
    baseUrl: '/',
    host: 'localhost',
    port: 8080,
    ENV: ENV,
    HMR: HMR
};

module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: true,
    // cache: false,

    context: __dirname,
    entry: {
        app: "./app/modules/main",
        vendor: "./app/modules/polyfills"
    },  
    output: {
        path: path.resolve('build/js'),
        publicPath: '/build/js',
        filename: "[name].bundle.js",
        sourceMapFilename: '[name].bundle.map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "tslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.(ttf|eot|svg)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: "file"
            }
        ],
        noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
        new CommonsChunkPlugin({ name: 'common', filename: 'common.bundle.js', minChunks: 2, chunks: ['app', 'vendor'] }),
        // include uglify in production
         new webpack.ProvidePlugin({
            "io": "socket.io-client"
         }),

        new CopyWebpackPlugin([ { from: 'app/assets/images', to: 'images' } ]),

        // replace
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV),
                'HMR': HMR
            }
        })
    ],

    // Other module loader config
    tslint: {
      emitErrors: false,
      failOnHint: false
    },
    
  resolve: {
    extensions: ['', '.ts', '.async.ts', '.js'],
    root: path.join(__dirname, 'build/js/') //public
  }

};
