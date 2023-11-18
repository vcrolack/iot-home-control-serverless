const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    // PANTRIES
    'getPantries': './src/lambdas/pantries/getPantries/index.js',
    'createPantries': './src/lambdas/pantries/createPantries/index.js',
    'deletePantries': './src/lambdas/pantries/deletePantries/index.js',
    'updatePantries': './src/lambdas/pantries/updatePantries/index.js',
    'getPantriesById': './src/lambdas/pantries/getPantriesById/index.js',

    // USERS
    'getUsers': './src/lambdas/users/getUsers/index.js',
    'getUsersById': './src/lambdas/users/getUsersById/index.js',
    'updateUsers': './src/lambdas/users/updateUsers/index.js',
    'deleteUsers': './src/lambdas/users/deleteUsers/index.js',

    // AUTH
    'register': './src/lambdas/auth/register/index.js',
    'login': './src/lambdas/auth/login/index.js',
    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {targets: {node: '14'}}]]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
  }
};