module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    indent: 'off',
    'vue/html-indent': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    quotes: 'off',
    'comma-dangle': 'off',
    semi: 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'no-unused-expressions': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'off'
  }
}
