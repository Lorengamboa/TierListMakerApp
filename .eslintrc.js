module.exports = {
  root: true,
  extends: "@react-native-community",
  plugins: ["module-resolver"],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".json", ".native.js"]
      }
    }
  },
  rules: {
    "module-resolver/use-alias": 2
  },
  overrides: [
    {
      files: ["Libraries/**/*.js"],
      rules: {
        "@react-native-community/no-haste-imports": 2,
        "@react-native-community/error-subclass-name": 2,
        "@react-native-community/platform-colors": 2
      }
    },
    {
      files: [
        "**/__fixtures__/**/*.js",
        "**/__mocks__/**/*.js",
        "**/__tests__/**/*.js",
        "jest/**/*.js",
        "RNTester/**/*.js"
      ],
      globals: {
        // Expose some Jest globals for test helpers
        afterAll: true,
        afterEach: true,
        beforeAll: true,
        beforeEach: true,
        expect: true,
        jest: true
      }
    },
    {
      files: ["**/__tests__/**/*-test.js"],
      env: {
        jasmine: true,
        jest: true
      }
    }
  ]
};
