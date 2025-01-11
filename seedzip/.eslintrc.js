module.exports = {
  root: true,
  extends: '@react-native',
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
    // 'ecmaFeatures': {
    //   'jsx': true
    // },
  },
};
