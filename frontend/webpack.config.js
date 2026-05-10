const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/index.js",
    cache: false,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(recharts|@auth0)\/).*/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        isProd === "production"
            ? new webpack.EnvironmentPlugin([
                "REACT_APP_API_BASE_URL",
                "REACT_APP_API_BASE_PORT",
                "REACT_APP_AUTH0_CLIENT_ID",
                "REACT_APP_AUTH0_DOMAIN"
            ])
            : new Dotenv(),
        new Dotenv(),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
};
