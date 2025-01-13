module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      "presets": ["@babel/preset-react"]
   },
  },
};
