import type { Config } from 'tailwindcss';
import config from '@bltzr-gg/ui/tailwind.config';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.tsx'],
  presets: [config],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%': {
            transform: 'scale(1.25) translate3d(0, 2px, 0)',
          },
          '20%': {
            transform: 'scale(1.3) translate3d(4px, -4px, 0)',
          },
          '30%': {
            transform: 'scale(1.35) translate3d(-8px, 0px, 0)',
          },
          '40%': {
            transform: 'scale(1.4) translate3d(8px, 4px, 0)',
          },
          '50%': {
            transform: 'scale(1.45) translate3d(-8px, -8px, 0)',
          },
          '60%': {
            transform: 'scale(1.5) translate3d(8px, 6px, 0)',
          },
          '70%': {
            transform: 'scale(1.55) translate3d(-8px, 8px, 0)',
          },
          '80%': {
            transform: 'scale(1.6) translate3d(8px, -8px, 0)',
          },
          '90%': {
            transform: 'scale(1.65) translate3d(-8px, 10px, 0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(5) translate3d(0, 0, 0)',
            opacity: '0',
          },
        },
      },
      animation: {
        shake: 'shake 1.25s ease forwards',
      },
    },
  },
} satisfies Config;
