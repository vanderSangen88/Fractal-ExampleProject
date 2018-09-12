/**********************************
 * Environment & imports
 *********************************/

const environment = process.env.NODE_ENV || "development";

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

/**********************************
 * Entry
 *********************************/
const entry = {
    "bundle": [
        './src/js/bundle'
    ]
};

/**********************************
 * Module
 *********************************/
const _module = {
    rules: [
        {
            test: /\.scss$/,
            exclude: [
                "node_modules"
            ],
            use: [ 
                MiniCSSExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ],
        }
    ]
};

/**********************************
 * Optimization
 *********************************/
const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "common", 
                chunks: "all"
            }
        }
    }
};

/**********************************
 * Output
 *********************************/
const output = {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/assets'),
    pathinfo: true
};

if (environment === "production") {
    output.filename = '[name].[hash].min.js';
    output.pathinfo = false;
} else if (environment === "development") {
    output.path = path.resolve(__dirname, './public/assets/js');
    // output.publicPath = '/js/';
}

/**********************************
 * Plugins
 *********************************/
const plugins = [
    new MiniCSSExtractPlugin({
        filename: environment === "production" ? '[name].[hash].min.css' : '../css/[name].css',
        disable: false,
        allChunks: false
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer()
            ]
        }
    }),
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }
    })
];

/**********************************
 * Resolve
 *********************************/
const resolve = {
    extensions: [
        '.js'
    ]
};

module.exports = {
   entry,
   output,
   resolve,
   mode: environment,
   module: _module,
   optimization,
   plugins
};