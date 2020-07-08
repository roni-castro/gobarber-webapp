import api from '../api';

export const forgotPassword = async (email: string) => {
  const data = await api.post('/password/forgot', { email });
  return data;
};
