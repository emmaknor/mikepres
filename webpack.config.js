const path = require('path');
const { DefinePlugin } = require('webpack');

const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
}).parsed;

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, './client/src'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.resolve(__dirname, './client/public'),
      filename: 'bundle.js',
    },
    plugins: [
      new DefinePlugin({
        'env.PORT': dotenv.PORT,
      })
    ],
  };
};
