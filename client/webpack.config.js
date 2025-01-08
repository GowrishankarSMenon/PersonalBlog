const webpack = require('webpack');

module.exports = {
  // Your existing configuration
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/')
    }
  },
  plugins: [
    // Your existing plugins
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
};