import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getApiToken = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/token`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const regenerateToken = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/regenerate-token`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const getApiDocumentation = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/documentation`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getApiToken,
  regenerateToken,
  getApiDocumentation
};