import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { useAuth } from '../../../AuthContext';
import { API_ENDPOINTS } from '../../../config/api';

// Mock do useAuth
jest.mock('../../../AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock do fetch
global.fetch = jest.fn();

const mockLogin = jest.fn();
const mockLogout = jest.fn();

describe('LoginScreen', () => {
  beforeEach(() => {
    // Reset dos mocks antes de cada teste
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      logout: mockLogout,
    });
    (fetch as jest.Mock).mockClear();
  });

  // TESTE 1: Verificar se todos os elementos são renderizados corretamente
  test('deve renderizar todos os elementos da tela de login', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Verifica se o título está presente
    expect(getByText('Login')).toBeTruthy();
    
    // Verifica se os campos de input estão presentes
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    
    // Verifica se o botão está presente
    expect(getByText('Entrar')).toBeTruthy();
  });

  // TESTE 2: Testar o fluxo de login com sucesso
  test('deve fazer login com sucesso quando credenciais válidas são fornecidas', async () => {
    // Mock de resposta de sucesso da API
    const mockUser = { id: 1, email: 'test@example.com', nome: 'Usuário Teste' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Preencher os campos
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(senhaInput, '123456');

    // Clicar no botão de login
    fireEvent.press(loginButton);

    // Verificar se a API foi chamada corretamente
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', senha: '123456' }),
      });
    });

    // Verificar se a função login foi chamada com o usuário correto
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(mockUser);
    });
  });

  // TESTE 3: Testar exibição de erro quando campos estão vazios
  test('deve exibir erro quando campos obrigatórios estão vazios', async () => {
    const { getByText, queryByText } = render(<LoginScreen />);

    const loginButton = getByText('Entrar');

    // Tentar fazer login sem preencher os campos
    fireEvent.press(loginButton);

    // Verificar se a mensagem de erro é exibida
    await waitFor(() => {
      expect(getByText('Preencha email e senha')).toBeTruthy();
    });

    // Verificar se fetch não foi chamado
    expect(fetch).not.toHaveBeenCalled();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  // TESTE 4: Testar tratamento de erro de login
  test('deve exibir erro quando credenciais são inválidas', async () => {
    // Mock de resposta de erro da API
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciais inválidas' }),
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Preencher os campos com credenciais inválidas
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(emailInput, 'invalid@example.com');
    fireEvent.changeText(senhaInput, 'wrongpassword');
    fireEvent.press(loginButton);

    // Verificar se a mensagem de erro é exibida
    await waitFor(() => {
      expect(getByText('Credenciais inválidas')).toBeTruthy();
    });

    // Verificar se a função login não foi chamada
    expect(mockLogin).not.toHaveBeenCalled();
  });

  // TESTE 5: Testar tratamento de erro de conexão
  test('deve exibir erro de conexão quando fetch falha', async () => {
    // Mock de erro de conexão
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Preencher os campos
    const emailInput = getByPlaceholderText('Email');
    const senhaInput = getByPlaceholderText('Senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(senhaInput, '123456');
    fireEvent.press(loginButton);

    // Verificar se a mensagem de erro de conexão é exibida
    await waitFor(() => {
      expect(getByText('Erro de conexão com o servidor')).toBeTruthy();
    });

    // Verificar se a função login não foi chamada
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
