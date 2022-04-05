const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/virtual/',
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    static: path.join(__dirname, 'www')
  }
}