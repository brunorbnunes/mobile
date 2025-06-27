/**
 * ====================================================================
 * 📡 CONFIGURAÇÃO DA API - VERSÃO COMMONJS
 * ====================================================================
 * 
 * Versão CommonJS da configuração da API para compatibilidade
 * com testes e módulos que requerem require().
 * 
 * 📍 IP Atual: 192.168.195.173:5001
 * 🔗 Sincronizado com api.ts
 * ====================================================================
 */

// 🌐 URL base da API
const API_BASE_URL = "http://192.168.195.173:5001/api";

// 🎯 Endpoints da API (versão simplificada para testes)
const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  CALENDARIO: `${API_BASE_URL}/calendario`,
  FREQUENCIAS: `${API_BASE_URL}/frequencias`,
};

// 📤 Exportação CommonJS
module.exports = {
  API_BASE_URL,
  API_ENDPOINTS,
};
