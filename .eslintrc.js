module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    amd: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'new-cap': 'off',
    'prefer-object-spread': 'off',
    'max-classes-per-file': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        comments: 120,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'no-param-reassign': 'off',

    // TypeScript specific rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
