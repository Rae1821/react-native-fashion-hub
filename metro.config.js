/* eslint-env node */

const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config)} */
// const config = getDefaultConfig(__dirname);
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(defaultConfig, { input: "./app/globals.css" });
