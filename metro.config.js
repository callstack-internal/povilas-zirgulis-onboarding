const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    assetExts: ['png', 'jpg', 'jpeg', 'gif'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'svg'],
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};
