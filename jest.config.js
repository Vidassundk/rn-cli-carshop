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
    'node_modules/(?!(react-native|react-native-geolocation-service|react-native-maps|@react-native|react-native-vector-icons)/)',
  ],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  testTimeout: 10000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
