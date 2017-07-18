module.exports={
    entry: "./app/index.js",
    output: {
        filename: "temblor-acc.js",
        path: __dirname + "/dist",
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
};