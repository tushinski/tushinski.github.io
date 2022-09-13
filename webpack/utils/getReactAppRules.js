const {getStyleLoaders} = require("./getStyleLoaders");

const extRegex = {
    css: /\.css$/,
    cssModule: /\.m\.css$/,
    sass: /\.scss$/,
    sassModule: /\.m\.scss$/,
}

/**
 * @param isDevelopment
 * @returns {[]} An array of rules for 'webpackConfig.module.rules'
 */
const getReactAppRules = (isDevelopment) => {
    return [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },

        {
            test: extRegex.css,
            exclude: extRegex.cssModule,
            use: getStyleLoaders({
                cssOptions: {
                    importLoaders: 1,
                    sourceMap: isDevelopment,
                },
                isDevelopment
            }),
            sideEffects: true,
        },

        {
            test: extRegex.cssModule,
            use: getStyleLoaders({
                cssOptions: {
                    importLoaders: 1,
                    sourceMap: isDevelopment
                },
                isDevelopment
            }),
        },

        {
            test: extRegex.sass,
            exclude: extRegex.sassModule,
            use: getStyleLoaders({
                cssOptions: {
                    importLoaders: 3,
                    sourceMap: isDevelopment,
                },
                preProcessor: 'sass-loader',
                isDevelopment
            }),
            sideEffects: true,
        },

        {
            test: extRegex.sassModule,
            use: getStyleLoaders({
                cssOptions: {
                    importLoaders: 3,
                    sourceMap: isDevelopment,
                    modules: {
                        localIdentName: "[local]__[hash]",
                        exportLocalsConvention: 'camelCase',
                    },
                },
                preProcessor: 'sass-loader',
                isDevelopment
            }),
        },

        {
            test: /\.(jpe?g|png|gif|ico|svg)$/,
            type: "asset/inline",
        },

        {
            test: /\.(woff2?|ttf|eot|svg)$/,
            type: "asset/resource"
        }
    ]
}

module.exports = { getReactAppRules };