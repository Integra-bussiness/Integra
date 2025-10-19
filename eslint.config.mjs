import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Игнорируем файлы ПЕРВЫМ блоком (это важно!)
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      // Prisma generated files
      '**/src/generated/**',
      '**/generated/**',
      '**/*.config.js',
      '**/*.config.mjs',
    ],
  },
  // Основная конфигурация Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Переопределяем правила
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
