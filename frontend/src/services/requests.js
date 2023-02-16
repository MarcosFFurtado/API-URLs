import axios from 'axios';

const api = axios.create({
  baseURL: 'http://guided-silver-production.up.railway.app'  || '3003',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const createUrl = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
