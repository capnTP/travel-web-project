const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.4',
      flowVersion: '0.77'
    }
  },
  plugins: ['react', 'prettier', 'flowtype'],
  rules: {
    // TODO: Remove below rules (use airbnb's)
    'no-restricted-globals': 1,
    'no-bitwise': 1,
    'react/sort-comp': 1,
    'consistent-return': 1,
    'import/named': 1,
    'no-nested-ternary': 1,
    'react/no-access-state-in-setstate': 1,
    'react/no-multi-comp': 1,
    'react/no-unused-state': 1,
    // TODO: Remove above rules (use airbnb's)
    camelcase: OFF,
    'flowtype/sort-keys': [
      ERROR,
      'asc',
      {
        caseSensitive: true,
        natural: false,
      },
    ],
    'import/no-extraneous-dependencies': OFF,
    'import/order': [WARN, { 'newlines-between': 'always' }],
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/label-has-for': [
      ERROR,
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/mouse-events-have-key-events': OFF,
    'linebreak-style': OFF,
    'no-underscore-dangle': OFF,
    'prefer-destructuring': OFF,
    'prettier/prettier': [
      ERROR,
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 100,
        tabWidth: 2,
      },
    ],
    'react/destructuring-assignment': OFF,
    'react/forbid-prop-types': [ERROR, { forbid: ['any', 'array'] }],
    'react/jsx-sort-props': ERROR,
    'react/prefer-stateless-function': OFF,
  },
};
