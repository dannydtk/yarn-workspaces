const { resolve } = require('node:path');

const project = [resolve(__dirname, 'tsconfig.json'), resolve(__dirname, 'tsconfig.node.json')];

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project,
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [".eslintrc.cjs"],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [require.resolve('@vercel/style-guide/eslint/jest'), require.resolve('@vercel/style-guide/eslint/jest-react')],
    },
    {
      files: [`**/*.[jt]sx`],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
              pascalCase: true,
            }
          }
        ],
        'import/no-absolute-path': 'off'
      }
    },
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    }
  ],
};
