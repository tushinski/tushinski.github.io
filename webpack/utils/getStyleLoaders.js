const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { paths } = require("./constants");

/*

Script dependencies:

style-loader
css-loader
postcss-loader
resolve-url-loader
postcss-preset-env
postcss-normalize
mini-css-extract-plugin

*/

const getStyleLoaders = ({ cssOptions, preProcessor, isDevelopment }) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {}
        },
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        {
            loader: 'postcss-loader',
            options: {
                // ident: 'postcss',
                postcssOptions: (loaderContext) => {
                    return {
                        plugins: [
                            require('postcss-preset-env')({
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            }),
                            postcssNormalize()
                        ]
                    }
                },
                sourceMap: isDevelopment,
            },
        },
    ];

    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: isDevelopment,
                    root: paths.common.root,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }

    return loaders;
};

module.exports = { getStyleLoaders };