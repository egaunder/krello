module.exports = {
  extends: 'airbnb',
  env: {
    jest: true,
  },
  rules: {
    'object-curly-newline': ['error', { 'multiline': true }],
    semi: ['error', 'never'],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false, 'variables': false }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used' }],
    'arrow-parens': ["error", 'as-needed']
  },
};