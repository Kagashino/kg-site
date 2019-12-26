module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "react-app",
    "airbnb",
    "airbnb/hooks"
  ],
  rules: {
    'import/no-unresolved': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
  }
  // ignorePatterns: ["build/"]
}
