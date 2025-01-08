module.exports = {
  presets: [
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: false,
    }],
    ['@babel/plugin-transform-runtime', {
      helpers: true,
      regenerator: true
    }]
  ],
  babelrcRoots: [
    ".",
    "apps/*",
    "packages/*"
  ]
};