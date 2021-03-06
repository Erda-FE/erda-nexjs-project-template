module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint-config-ali/typescript/react', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 2020, // specify the version of ECMAScript syntax you want to use: 2015 => (ES6)
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // enable JSX
      impliedStrict: true, // enable global strict mode
    },
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft', 'state', 'acc'] }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    'no-nested-ternary': 'off',
    'react/no-multi-comp': 'off',
    'jsx-first-prop-new-line': 'off',
    'no-unused-vars': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'no-console': 2,
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_', varsIgnorePattern: '^ignored?$' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    indent: 0,
    'react/jsx-no-undef': 0,
    '@typescript-eslint/consistent-type-assertions': [0, { objectLiteralTypeAssertions: 'allow-as-parameter' }],
    '@typescript-eslint/restrict-plus-operands': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'], // none ts script like webpack config or legacy node scripts
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/*/services/*.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
      },
    },
  ],
};
