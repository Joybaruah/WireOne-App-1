module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'linebreak-style': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 'off',
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
  },
};
