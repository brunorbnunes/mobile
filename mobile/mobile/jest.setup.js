// Mock fetch globally
global.fetch = jest.fn();

// Limpeza após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
