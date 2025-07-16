const { withNativeWind } = require("nativewind/metro");
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// 👇 Add this
config.resolver.alias = {
  "@": __dirname,
};

module.exports = withNativeWind(config, { input: "./app/globals.css" });