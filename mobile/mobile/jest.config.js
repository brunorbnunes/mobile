module.exports = {
  preset: '@testing-library/react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation|react-navigation|@react-navigation/.*|@unimodules|unimodules|sentry-expo|native-base|react-native-svg|react-native-iphone-x-helper|@react-native-community|@react-native-picker|react-native-super-grid|react-native-keychain|react-native-vector-icons|react-native-screens|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-webview|expo-.*|@expo/.*)/)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.config.{js,ts}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
};
