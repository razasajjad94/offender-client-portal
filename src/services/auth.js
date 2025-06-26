import axios from 'axios';

const API_URL = 'https://8577-182-180-118-76.ngrok-free.app/local';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/signin`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

const resetPassword = async (token, code, newPassword) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, {
    token,
    code,
    newPassword
  });
  return response.data;
};

const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/users/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const changePassword = async (passwordData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/users/change-password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  changePassword
};