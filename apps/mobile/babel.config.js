module.exports = {
  presets: [
    'module:@react-native/babel-preset'
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
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          '@repo': '../..',
          '@assets': './assets'
        }
      }
    ]
  ]
}; 