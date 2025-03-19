import pluginNext from '@next/eslint-plugin-next';
import pluginTailwind from 'eslint-plugin-tailwindcss';
import reactHooksPlugin from 'eslint-plugin-react-hooks'; // import the plugin
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for Next.js projects.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
  ...baseConfig,
  {
    plugins: {
      '@next/next': pluginNext,
      tailwindcss: {
        ...pluginTailwind,
      },
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginTailwind.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];
