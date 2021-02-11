module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    // '@react-native-community',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: [
    '.eslintrc.js',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-multiple-empty-lines': 0,

    'react/jsx-indent-props': [2, 2],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-spacing': [2, 'always', {'spacing': { 'objectLiterals': 'never' }}], // spaces for jsx components props

    '@typescript-eslint/no-use-before-define': 0,
  },
};
