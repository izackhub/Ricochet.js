const path = require('path');
module.exports = {
  // entry: path.join(__dirname, 'app', 'DomList.ts'),
  entry: path.join(__dirname, 'src', 'Ricochet.ts'),
  output: {
    filename: 'ricochet.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.ts$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.json', '.js', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/demo/')
  },
  watch: true
};