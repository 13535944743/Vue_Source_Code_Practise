const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    // 虚拟打包路径，bundle.js文件没有真正的生成
    publicPath: "/virtual/"
  },

  devServer: {
    // 静态文件根目录
    static: path.join(__dirname, 'www'),
    // 不压缩
    compress: false,
    port: 8080,
  }
}