import api from '../../api';
import UserData from '../../models/UserData';

export const updateAvatar = async (formData: FormData) => {
  const response = await api.patch<UserData>('/users/avatar', formData);
  return response.data;
};

interface UpdateUserInfoBody {
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

export const updateUserInfo = async (data: UpdateUserInfoBody) => {
  const response = await api.put<UserData>('/user', data);
  return response.data;
};
