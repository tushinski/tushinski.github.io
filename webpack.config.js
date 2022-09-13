const {paths} = require("./webpack/utils/constants");
const {getReactAppRules} = require("./webpack/utils/getReactAppRules");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path");
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = (env, argv) => {
    return {
        mode: env.production ? "production" : "development",
        devtool: env.production ? false : "eval-source-map",
        resolve: {
            extensions: [".js", ".ts", ".tsx"],
            alias: {
                "@scss": path.resolve(__dirname, "app/scss"),
            }
        },
        module: {
            rules: getReactAppRules(false),
        },
        entry: {
            test: paths.tests.index,
            app: paths.app.index,
        },
        output: {
            filename: '[name].js',
            path: env.production ? paths.common.prodBuild : paths.common.build,
            clean: true,
        },
        devServer: {
            host: "0.0.0.0",
            port: "8080",
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Tushinski",
                filename: "index.html",
                template: paths.app.template,
                chunks: ['app'],
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-[contenthash].css",
            }),
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd(),
            }),
        ]
    }
};