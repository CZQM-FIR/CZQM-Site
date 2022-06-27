module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-underscore-dangle': 'off',
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
}
