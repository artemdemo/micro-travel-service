const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    IgnorePlugin,
    DefinePlugin,
} = require('webpack');
const {
    ModuleConcatenationPlugin,
} = require('webpack').optimize;
const extractStyles = require('./extractStyles');

const fontLoaders = [
    {
        test: /\.(svg)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]',
    },
    {
        test: /\.(woff)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]',
    },
    {
        test: /\.(woff2)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]',
    },
    {
        test: /\.([ot]tf)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
    },
    {
        test: /\.(eot)(\?.*$|$)/,
        use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
    },
];

/**
 * @param options {Object}
 * @param options.isProduction {Boolean}
 * @param options.buildFolder {String}
 * @param options.appVersion {String}
 * @param options.appName {String}
 * @param options.extractStylesFile {Boolean}
 */
module.exports = (options) => {
    console.log(process.cwd());

    return {
        entry: {
            bundle: './source/index.js',
        },
        output: {
            path: `${process.cwd()}/${options.buildFolder}`,
            libraryTarget: 'umd',
            library: options.appName,

            // Here I'm explicitly defining app folder
            // The reason is to support async loading of the files.
            // Later this files will be copied by the core app and will be available in the run time.
            filename: `./${options.appName}/[name].js`,
            chunkFilename: options.isProduction ?
                `./${options.appName}/[id].chunk-[chunkhash].js` :
                `./${options.appName}/[id].chunk.js`,
            publicPath: '/',
        },
        externals: [
            'react',
            'react-dom',
            'react-router',
            'react-redux',
            'prop-types',
            'classnames',
            'reselect',
            /^@app\/.+$/,
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|js|jsx)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },

                extractStyles.moduleRule(options.extractStylesFile),

                {test: /\.(png|gif|jpg)(\?.*$|$)/, use: 'url-loader?limit=100000&name=images/[hash].[ext]'},

                ...fontLoaders,
            ],
        },
        plugins: [
            // ModuleConcatenationPlugin
            // * faster build
            // * faster execution time in the browser
            // @link https://webpack.js.org/plugins/module-concatenation-plugin/
            new ModuleConcatenationPlugin(),

            // Ignoring warnings for following plugins, case they doesn't matter
            new IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),

            // Defining global ENV variable
            // Useful for some age cases, when you need explicitly know whether you're in development or not
            // For example, when you want to log out something only in development mode
            // and don't want to delete this code in production, just want to deactivate it then.
            new DefinePlugin({
                ENV: {production: options.isProduction},
            }),

            new CleanWebpackPlugin([options.buildFolder], {
                verbose: true,
                dry: false,
                root: process.cwd(),
                exclude: ['.gitignore'],
            }),

            ...extractStyles.plugins(options.extractStylesFile, options.isProduction),
        ],
    };
};
