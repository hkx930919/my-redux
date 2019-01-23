const path = require("path");

const htmlPlugin = require("html-webpack-plugin");
console.log(path.resolve(__dirname, "dist"));

module.exports = {
    mode:'development',
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]

    },
    devServer: {
        contentBase: "./dist"
    },
    plugins:[
        new htmlPlugin({
            template:'./index.html'
        })
    ]
};
