module.exports = {
  // Specify the environment
  env: {
    browser: true,
    es2021: true,
  },
  // Extend recommended configurations
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  // Specify the parser options
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // Define the rules
  rules: {
    'vue/multi-word-component-names': 'off',
    // Other rules can be added here
  },
};