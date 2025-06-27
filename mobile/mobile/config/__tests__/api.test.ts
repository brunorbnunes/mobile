// Teste simples da configuração da API usando CommonJS
const { API_BASE_URL, API_ENDPOINTS } = require('../api.js');

describe('API Configuration', () => {
  test('deve ter as configurações corretas da API', () => {
    expect(API_BASE_URL).toBe('http://192.168.195.173:5001/api');
    expect(API_ENDPOINTS.LOGIN).toBe('http://192.168.195.173:5001/api/login');
    expect(API_ENDPOINTS.CALENDARIO).toBe('http://192.168.195.173:5001/api/calendario');
    expect(API_ENDPOINTS.FREQUENCIAS).toBe('http://192.168.195.173:5001/api/frequencias');
  });

  test('deve ter todas as propriedades necessárias', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(API_ENDPOINTS).toBeDefined();
    expect(API_ENDPOINTS.LOGIN).toBeDefined();
    expect(API_ENDPOINTS.CALENDARIO).toBeDefined();
    expect(API_ENDPOINTS.FREQUENCIAS).toBeDefined();
  });
});
