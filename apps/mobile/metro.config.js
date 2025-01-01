const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
  watchFolders: [
    projectRoot,
    workspaceRoot,
    path.resolve(workspaceRoot, 'packages/shared'),
  ],
};

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  config,
);
