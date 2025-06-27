const API_BASE_URL = "http://192.168.0.20:5001/api";

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  CALENDARIO: `${API_BASE_URL}/calendario`,
  FREQUENCIAS: `${API_BASE_URL}/frequencias`,
};

module.exports = {
  API_BASE_URL,
  API_ENDPOINTS,
};
