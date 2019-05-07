const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:7]',
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        exclude: [/\.(js|jsx|mjs|less|css|ejs)$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IMIGIX_URL: JSON.stringify('https://theasia.imgix.net'),
    }),
  ],
};
