const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonWebPackConfig = require('./webpack.common.js');

module.exports = (env = {}) => {
    env.isSourceMap = true;
    env.mode = 'development';
    env.app = process.env.npm_config_app;
    return merge(commonWebPackConfig(env), {
        devtool: 'eval-source-map',
        mode: env.mode,
        output: {
            filename: '[name].js',
        },
        devServer: {
            client:{
                overlay: false, // shows a full-screen overlay in the browser when there are compiler errors or warnings

            },
            headers: { 'Access-Control-Allow-Origin': '*' }, // This stops a CORS issue
            hot: 'only', // do not refresh page if HMR fails
            static : [
                path.resolve(__dirname, '../'),
            ]
        },

        optimization: {
            runtimeChunk: false,
        },

        plugins: [
            // new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin({
                overlay: false,
            }),
        ],
    });
};
