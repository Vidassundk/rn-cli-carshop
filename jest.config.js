module.exports = {
  preset: 'react-native',
  testEnvironment: 'jest-environment-jsdom', // Now correctly pointing to the installed package
  setupFiles: ['<rootDir>/jest-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library|@react-navigation)/)',
  ],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  testTimeout: 10000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
