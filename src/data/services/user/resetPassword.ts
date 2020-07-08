import api from '../../api';

interface ResetPasswordBody {
  token: string;
  password: string;
  confirmPassword: string;
}

export const resetPassword = async (body: ResetPasswordBody) => {
  const data = await api.post('/password/reset', body);
  return data;
};
