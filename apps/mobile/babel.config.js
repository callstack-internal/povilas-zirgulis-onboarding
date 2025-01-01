module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
    }],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@msw': './src/msw',
          '@assets': './assets'
        }
      }
    ]
  ]
};
