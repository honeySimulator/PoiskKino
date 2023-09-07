module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    testMatch: [
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).js?(x)'
    ]
    // Другие настройки Jest...
};
