module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "space-before-function-paren": [
      "error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "no-unused-vars": ["error", { "vars": "none", "args": "after-used", "ignoreRestSiblings": false }],
    "eol-last": ["error", "always"]
  }
};