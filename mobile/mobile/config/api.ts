/**
 * ====================================================================
 * 📡 CONFIGURAÇÃO DA API - APLICATIVO MÓVEL
 * ====================================================================
 * 
 * Este arquivo centraliza todas as configurações de endpoints da API
 * para facilitar manutenção e alterações de IP/domínio.
 * 
 * 📍 IP Atual: 192.168.195.173:5001
 * 📋 Arquivos que utilizam esta configuração:
 *    • LoginScreen.test.js
 *    • api.js  
 *    • api.ts
 *    • api.test.js
 *    • api.test.ts
 * 
 * ⚠️  Para alterar o IP da rede, modifique apenas a constante API_BASE_URL
 * ====================================================================
 */

// 🌐 URL base da API
export const API_BASE_URL = "http://192.168.195.173:5001/api";

// 🎯 Endpoints organizados da API
export const API_ENDPOINTS = {
  // Autenticação
  LOGIN: `${API_BASE_URL}/login`,
  
  // Dados acadêmicos
  CALENDARIO: `${API_BASE_URL}/calendario`,
  FREQUENCIAS: `${API_BASE_URL}/frequencias`,
  ALUNOS_TURMAS: `${API_BASE_URL}/alunos-turmas`,
  TURMAS: `${API_BASE_URL}/turmas`,
  
  // Administração
  UNIDADES: `${API_BASE_URL}/unidades`,
  USERS: `${API_BASE_URL}/users`,
} as const;

// 🔄 Compatibilidade com CommonJS para testes
module.exports = {
  API_BASE_URL,
  API_ENDPOINTS,
};