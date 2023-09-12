module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'indent': ['error', 2],
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'object-curly-newline': ['error', {
      multiline: true,
      consistent: true,
    }],
    "operator-linebreak": ["error", "after"],
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": ["function-declaration", "arrow-function"],
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }]
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"]
        ],
        "extensions": [".ts", ".js", ".jsx", ".json"]
      }
    }
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
}
