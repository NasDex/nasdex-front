/** @format */

module.exports = {
    parser: '@typescript-eslint/parser', 
    // "extends": ['plugin:@typescript-eslint/recommended','plugin:prettier/recommended','prettier/@typescript-eslint'], 
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'], 
    plugins: ['@typescript-eslint', 'prettier'], 
    env: {
        browser: true,
        es6: true,
    },
    rules: {
        'prettier/prettier': 1, 
        semi: ['error', 'never'], 
        '@typescript-eslint/explicit-module-boundary-types': 0, 
    },
}
