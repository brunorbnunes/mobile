import '@testing-library/jest-native/extend-expect';

// Mock fetch globally
global.fetch = jest.fn();

// Mock do AuthContext
jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

// Mock do React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// Limpeza após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
