module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme', '@todo', '@fixme'], location: 'anywhere' },
    ],
    'multiline-comment-style': ['error', 'starred-block'],
    'lines-around-comment': ['error', { beforeBlockComment: true }],
    'no-inline-comments': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
