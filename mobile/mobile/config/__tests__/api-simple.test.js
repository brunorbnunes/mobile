// Teste simples em JavaScript
const { API_ENDPOINTS, API_BASE_URL } = require('../../config/api');

describe('API Configuration - Simple Test', () => {
  test('deve ter URL base definida', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  test('deve ter endpoints definidos', () => {
    expect(API_ENDPOINTS).toBeDefined();
    expect(API_ENDPOINTS.LOGIN).toBeDefined();
    expect(typeof API_ENDPOINTS.LOGIN).toBe('string');
  });
});
