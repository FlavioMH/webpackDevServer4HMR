const path = require('path');
const webpack = require('webpack');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const PATHS = {
    app: path.resolve(__dirname, '../src/app'),
    configs: path.resolve(__dirname, '../configs'),
    dist: path.resolve(__dirname, '../dist'),
    nodeModules: path.resolve(__dirname, '../node_modules'),
    root: path.resolve(__dirname, '..'),
    src: path.resolve(__dirname, '../src'),
};

module.exports = (env = {}) => {
    return {
        cache: true,
        context: PATHS.root,
        stats: {
            children: false
        },
        target: 'web',
        entry: {
            app: [
                 'react-refresh/runtime',
                 './src/indexTestApplication.tsx',
            ],
        },
        output: {
            path: PATHS.dist + '/' + (env.app == true ? 'suite' : env.app),
            publicPath: '/',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: [
                'common', // Needed for foundation debug
                'src',
                'configs',
                PATHS.nodeModules,
            ],
        },
        module: {
            rules: [
                // typescript
                {
                    include: [PATHS.src],
                    test: /\.(j|t)s(x)?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: false,
                                presets: [
                                    ['@babel/preset-env'],
                                    ['@babel/preset-react', { development: env.mode == 'development'} ],
                                    '@babel/preset-typescript',
                                ],
                                plugins: [
                                    ['@babel/plugin-syntax-decorators', { "legacy": true }],
                                    ["@babel/plugin-proposal-class-properties"],
                                    '@babel/plugin-syntax-typescript',
                                    'const-enum',
                                    '@babel/plugin-transform-typescript',
                                    '@babel/plugin-syntax-jsx',
                                    'react-refresh/babel',
                                ],
                            },
                        },
                    ]
                },
                // json
                {
                    include: [PATHS.src],
                    test: /\.json$/,
                    use: { loader: 'json-loader' },
                },
                // css
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                // scss
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader' // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'resolve-url-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, '../src')],
                                sourceMap: true
                            },
                        },
                    }],
                },
                // fonts
                {
                    test: /\.(eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: "./fonts/[name].[ext]",
                        },
                    },
                },
                // svg
                {
                    test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 50000,
                            name: "./fonts/[name].[ext]",
                        },
                    },
                },
                // ttf
                {
                    test: /\.(ttf)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 50000,
                            name: "./fonts/[name].[ext]",
                        },
                    },
                },
                // woff-woff2
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 50000,
                            name: "./fonts/[name].[ext]",
                        },
                    },
                },
            ],
        },
        plugins: [
            // new ForkTsCheckerWebpackPlugin({
            //     typescript: {
            //       diagnosticOptions: {
            //         semantic: true,
            //         syntactic: true,
            //       },
            //       mode: "write-references",
            //     },
            //   }),
        ],
    };
};
