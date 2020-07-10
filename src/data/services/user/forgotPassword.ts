import api from '../../api';

export const forgotPassword = (email: string) => {
  return api.post('/password/forgot', { email });
};
