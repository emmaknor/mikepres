const path = require('path');

module.exports = () => {
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
  };
};
