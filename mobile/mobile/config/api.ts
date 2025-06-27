// Configuração das URLs da API para o aplicativo móvel (Arquivos que usam ip: LoginScreen.test.js, api.js, api.ts, api.test.js e api.test.ts)
export const API_BASE_URL = "http://192.168.15.12:5001/api";
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  CALENDARIO: `${API_BASE_URL}/calendario`,
  FREQUENCIAS: `${API_BASE_URL}/frequencias`,
  ALUNOS_TURMAS: `${API_BASE_URL}/alunos-turmas`,
  TURMAS: `${API_BASE_URL}/turmas`,
  UNIDADES: `${API_BASE_URL}/unidades`,
  USERS: `${API_BASE_URL}/users`,
};

// Para compatibilidade com CommonJS
module.exports = {
  API_BASE_URL,
  API_ENDPOINTS,
};