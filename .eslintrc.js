module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier', '@typescript-eslint', 'unicorn'],
  rules: {
    indent: ['error', 2],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-duplicate-imports': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'no-multiple-empty-lines': ['error', {max: 1}],
    'space-in-parens': ['error', 'always'],
    'unicorn/no-for-loop': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'IfStatement > :not(BlockStatement).consequent',
        message: 'Use block statement after if, please check STYLE_GUIDE.md',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-useless-catch': 1,
    'no-var': 'error',
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'keyword-spacing': ['error', {
      before: true,
      after: true
    }],
    'max-classes-per-file': ['error', 2],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
  ignorePatterns: ['*.md'],
  overrides: [
    {
      files: [
        'layouts/**/*.{js,ts,vue}',
        'pages/**/*.vue',
        'components/**/*.{js,ts,vue}',
        'utils/**/*.ts',
        'stores/**/*.ts',
        'plugins/**/*.ts',
        'composables/**/*.ts',
        'locales/**.json'
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '*.png',
                  '*.jpg',
                  '*.jpeg',
                  '*.gif',
                  '*.bmp',
                  '*.svg',
                  '*.webp',
                ],
                message:
                  'It is recommended to utilize HTML tags and using a URL path, instead of directly importing images using JavaScript',
              },
            ],
          },
        ],
      },
    },
  ],
};
