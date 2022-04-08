/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  },
  "rules": {
    "vue/no-unused-components": "off", // Turn off error reporting when there are components defined but not used
    "no-unused-vars": "off" // turn off error reporting when there are defined but unused variables
  },
  lintOnSave: false
}
