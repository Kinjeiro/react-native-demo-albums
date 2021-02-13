/**
 * Metro configuration for React Native with svg support
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const { getDefaultConfig } = require('metro-config');
const { getDefaultConfig } = require("@expo/metro-config");

/*
  @NOTE:
  Don’t forget to also update your iOs pod file in the ios directory:
  cd ios && npx pod-install.
*/

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  // } = await getDefaultConfig();

  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
