import js from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import unusedImports from 'eslint-plugin-unused-imports'
// import importPlugin from 'eslint-plugin-import'
// import pluginPromise from 'eslint-plugin-promise'
// import pluginSecurity from 'eslint-plugin-security'

export default defineConfig([
  // js.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  {
    files: ['src/**/*.{js,mjs,cjs}'],
    plugins: { js, 'simple-import-sort': simpleImportSort, 'unused-imports': unusedImports },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },

    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  // pluginPromise.configs['flat/recommended'],
  // pluginSecurity.configs['recommended'],
])
