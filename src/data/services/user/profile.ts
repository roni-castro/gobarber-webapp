import api from '../../api';

export const updateAvatar = async <R>(data: FormData) => {
  const response = await api.patch<R>('/users/avatar', data);
  return response.data;
};
