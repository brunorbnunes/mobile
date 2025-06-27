import { API_ENDPOINTS, API_BASE_URL } from '../../../config/api';

describe('API Configuration', () => {
  test('deve ter as configurações corretas da API', () => {
    expect(API_BASE_URL).toBe('http://192.168.0.20:5001/api');
    expect(API_ENDPOINTS.LOGIN).toBe('http://192.168.0.20:5001/api/login');
    expect(API_ENDPOINTS.CALENDARIO).toBe('http://192.168.0.20:5001/api/calendario');
    expect(API_ENDPOINTS.FREQUENCIAS).toBe('http://192.168.0.20:5001/api/frequencias');
  });
});
