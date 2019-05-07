module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  globals: {
    _SERVER: '',
    API_SERVER: '',
    APP_URL: '',
    GRAPHQL_URL: '',
    IMIGIX_URL: '',
    LOGGING_LEVEL: '',
    SANDBOX: true,
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'mjs', 'node', 'web.js', 'web.jsx'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  setupFiles: ['<rootDir>/config/jest.setup.js', '<rootDir>/config/polyfills.js'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/server/**/?(*.)(spec|test).js',
  ],
  testURL: 'http://localhost/',
  transform: {
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  verbose: true,
};
