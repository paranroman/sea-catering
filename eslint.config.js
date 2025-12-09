import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { 
    ignores: ['dist', 'node_modules'] 
  },
  
  // --- KONFIGURASI UNTUK FRONTEND (React) ---
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }], // Ubah error jadi warn agar tidak stop build
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-undef': 'error',
    },
  },

  // --- KONFIGURASI UNTUK BACKEND (Node.js) ---
  {
    files: ['server/**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Agar kenal 'process', 'console', dll
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },

  // --- KONFIGURASI UNTUK CYPRESS ---
  {
    files: ['cypress/**/*.{js,jsx}', '**/*.cy.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Manual define Cypress globals
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off', 
      'no-undef': 'off',       
    },
  },
];