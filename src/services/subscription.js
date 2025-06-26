import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getSubscriptionPlans = async () => {
  const response = await axios.get(`${API_URL}/subscription/plans`);
  return response.data;
};

const getUsageStats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/subscription/usage`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const createSubscription = async (subscriptionData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/subscription/subscribe`, subscriptionData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getSubscriptionPlans,
  getUsageStats,
  createSubscription
};