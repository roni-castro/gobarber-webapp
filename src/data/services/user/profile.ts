import api from '../../api';

export const updateAvatar = async <R>(formData: FormData) => {
  const response = await api.patch<R>('/users/avatar', formData);
  return response.data;
};
