const {getDefaultConfig} = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
  projectRoot,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), 'png', 'jpg', 'jpeg'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@repo/')) {
        const resolvedPath = path.resolve(
          workspaceRoot,
          moduleName.replace('@repo/', '')
        );
        return {
          filePath: resolvedPath,
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    }
  },
  watchFolders: [
    workspaceRoot,
    path.resolve(projectRoot, 'assets')
  ],
};

module.exports = config;
