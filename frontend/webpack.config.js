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
            ? new webpack.EnvironmentPlugin(["API_URL"])
            : new Dotenv(),
        new Dotenv(),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
};
