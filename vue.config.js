module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}
