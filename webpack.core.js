const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: [/\.tsx?$/],
                loader: 'awesome-typescript-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}