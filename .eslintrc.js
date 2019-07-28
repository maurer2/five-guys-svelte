module.exports = {
  extends: [
    'airbnb-base',
  ],
  env: {
    'browser': true,
    'es6': true,
  },
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      'files': ['**/*.svelte'],
      'processor': 'svelte3/svelte3'
    }
  ],
  rules: {
    'import/first': 'off', // import order cannot be determined correctly in .svelte components
    'import/no-mutable-exports': 'off',  // to dismiss `export let prop = 'default'` warning
    'no-labels': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'ForOfStatement', 'WithStatement'], // remove LabeledStatement from the list,
    'import/prefer-default-export': 'off',
  },
  settings: {
    'svelte3/ignore-styles': false,
  },
}