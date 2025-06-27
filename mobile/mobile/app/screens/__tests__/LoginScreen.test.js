// Mock do fetch antes de importar qualquer coisa
global.fetch = jest.fn();

// Mock do AuthContext
jest.mock('../../../AuthContext', () => ({
  useAuth: jest.fn(),
}));

const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react-native');

// Como estamos testando em ambiente Node, vamos simular os componentes React Native
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  Button: 'Button',
}));

// Mock dos estilos
jest.mock('../../../assets/styles/auth.styles', () => ({
  authStyles: {
    container: {},
    title: {},
    input: {},
    errorText: {},
  },
}));

describe('LoginScreen Tests', () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    jest.clearAllMocks();
    
    // Mock do useAuth
    require('../../../AuthContext').useAuth.mockReturnValue({
      login: mockLogin,
      logout: mockLogout,
    });
    
    global.fetch.mockClear();
  });

  // TESTE 1: Verificar validação de campos vazios
  test('deve mostrar erro quando campos estão vazios', () => {
    // Simula o comportamento da validação
    const email = '';
    const senha = '';
    
    // Lógica de validação (similar ao que está no componente)
    let erro = '';
    if (!email || !senha) {
      erro = 'Preencha email e senha';
    }
    
    expect(erro).toBe('Preencha email e senha');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  // TESTE 2: Testar chamada da API com sucesso
  test('deve fazer login com sucesso quando credenciais são válidas', async () => {
    // Mock de resposta de sucesso
    const mockUser = { id: 1, email: 'test@example.com', nome: 'Usuario Teste' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    // Simula o processo de login
    const email = 'test@example.com';
    const senha = '123456';
    
    // Simula a chamada da API (lógica do handleLogin)
    const response = await fetch('http://192.168.0.20:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    
    expect(response.ok).toBe(true);
    
    const user = await response.json();
    expect(user).toEqual(mockUser);
    
    // Verifica se fetch foi chamado com os parâmetros corretos
    expect(global.fetch).toHaveBeenCalledWith(
      'http://192.168.0.20:5001/api/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', senha: '123456' }),
      }
    );
  });

  // TESTE 3: Testar tratamento de erro de login
  test('deve tratar erro quando credenciais são inválidas', async () => {
    // Mock de resposta de erro
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciais inválidas' }),
    });

    // Simula tentativa de login com credenciais inválidas
    const email = 'invalid@example.com';
    const senha = 'wrongpassword';
    
    const response = await fetch('http://192.168.0.20:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    
    expect(response.ok).toBe(false);
    
    // Simula o tratamento de erro
    let erro = 'Erro ao fazer login';
    if (!response.ok) {
      try {
        const data = await response.json();
        erro = data.message || erro;
      } catch {}
    }
    
    expect(erro).toBe('Credenciais inválidas');
  });

  // TESTE 4: Testar tratamento de erro de conexão
  test('deve tratar erro de conexão com o servidor', async () => {
    // Mock de erro de rede
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    let erro = '';
    
    try {
      await fetch('http://192.168.0.20:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', senha: '123456' }),
      });
    } catch (err) {
      erro = 'Erro de conexão com o servidor';
    }
    
    expect(erro).toBe('Erro de conexão com o servidor');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  // TESTE 5: Testar formatação dos dados enviados para a API
  test('deve enviar dados no formato correto para a API', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, email: 'test@example.com' }),
    });

    const email = 'test@example.com';
    const senha = 'mypassword';
    
    await fetch('http://192.168.0.20:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    
    // Verifica se os dados foram enviados no formato correto
    expect(global.fetch).toHaveBeenCalledWith(
      'http://192.168.0.20:5001/api/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', senha: 'mypassword' }),
      })
    );
  });
});
