module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": [2, "always-multiline"],
    "no-var": "error",
    "object-shorthand": 2,
    "no-unused-vars": [
      2,
      { ignoreRestSiblings: true, argsIgnorePattern: "^h$" }
    ],
    "no-undef": 2,
    camelcase: "off",
    "no-extra-boolean-cast": "off",
    semi: ["error", "always"],
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "vue/no-reserved-keys": "off",
    "vue/comment-directive": "off",
    "vue/prop-name-casing": "off"
  }
};
