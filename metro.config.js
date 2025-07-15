const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 👇 Add this
config.resolver.alias = {
  "@": __dirname,
};

module.exports = withNativeWind(config, { input: "./app/globals.css" });
