import { nextJsConfig } from '@bltzr-gg/eslint-config/nextjs';

export default [
  ...nextJsConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
