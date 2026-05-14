const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    // svgをアセット拡張子から除外
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    // svgをソースコード拡張子に追加
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();