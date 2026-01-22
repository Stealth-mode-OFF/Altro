module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  settings: { react: { version: 'detect' } },
  env: { browser: true, es2021: true },
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};
