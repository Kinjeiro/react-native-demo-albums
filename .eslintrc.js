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
    'no-trailing-spaces': 0,
    'max-len': ['error', 120, 4, {'ignoreComments': true}],
    'implicit-arrow-linebreak': 0,
    'arrow-body-style': 0, // we have comments in empty function body

    'react/no-unused-prop-types': 'warn',

    'react/jsx-indent-props': [2, 2],
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-spacing': [2, 'always', {'spacing': { 'objectLiterals': 'never' }}], // spaces for jsx components props
    'react/jsx-props-no-multi-spaces': 0,

    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': 'warn'
  },
};
