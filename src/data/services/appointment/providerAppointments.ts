import api from '../../api';

interface AppointmentParams {
  day: number;
  month: number;
  year: number;
}

export const getProviderAppointments = async <R>() => {
  const date = new Date();
  const response = await api.get<R>('/appointments/me', {
    params: {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    } as AppointmentParams,
  });
  return response.data;
};
