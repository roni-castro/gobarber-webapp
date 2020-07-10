import api from '../../api';

interface ResetPasswordBody {
  token: string;
  password: string;
  confirmPassword: string;
}

export const resetPassword = (body: ResetPasswordBody) => {
  return api.post('/password/reset', body);
};
