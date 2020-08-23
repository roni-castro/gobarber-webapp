import axios from 'axios';
import EventPublisher from '../utils/eventPublisher';
import { getStorageItem } from '../utils/storage';
import { TOKEN } from './auth/authStorageConstants';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async function onFulfilled(config) {
  const token = await getStorageItem<string>(TOKEN);

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const emitTokenExpiredEvent = (): void => {
  EventPublisher.instance.publish('TOKEN_EXPIRED');
};

api.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    if (error.response.status === 401) {
      emitTokenExpiredEvent();
    }
    return Promise.reject(error);
  },
);

export default api;
