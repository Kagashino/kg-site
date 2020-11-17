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
    'import/no-unresolved': 'warn',
    'linebreak-style': ['off'],
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    'react/prop-types': 'off',
  }
  // ignorePatterns: ["build/"]
}
