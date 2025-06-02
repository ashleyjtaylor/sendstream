import tsParser from '@typescript-eslint/parser'
import tsEsLintPlugin from '@typescript-eslint/eslint-plugin'

const rules = {
  semi: ['error', 'never'],
  quotes: ['error', 'single'],
  indent: ['error', 2, { 'SwitchCase': 1 }],
  'max-len': ['error', { 'code': 160 }],
  'eol-last': 'error',
  'comma-dangle': 'error',
  'arrow-parens': ['error', 'as-needed'],
  'object-curly-spacing': ['error', 'always'],
  'no-trailing-spaces': 'error',
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: 'function', next: 'function' },
    { blankLine: 'always', prev: 'block-like', next: 'block-like' },
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
  ]
}

/** @type {import("eslint").Linter.Config} */
export const eslintBaseConfig = [
  {
    ignores: ['dist/**']
  },
  {
    files: [
      '**/*.js'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: rules
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx'
    ],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tsEsLintPlugin
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true
      }
    },
    rules: {
      ...rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  }
]
