const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { // commonJS规范
  mode: 'development', // production
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:  path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),  // 根目录
    open: true,  // 自动打开浏览器
}
}