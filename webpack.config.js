const path = require('path');

module.exports = {
  entry: './icalparse/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
            options: {
              // compile with TypeScript, then transpile with Babel
              useBabel: true,
              babelCore: "@babel/core"
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  }
};