module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
  plugins: [
    ['module:react-native-dotenv',{
    moduleName: '@env',
    path: '.env',
    blocklist: null,
    allowlist: null,
    safe: false,
    allowUndefined: true
  }]
],
};
