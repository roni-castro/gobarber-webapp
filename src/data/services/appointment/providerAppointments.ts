import api from '../../api';

interface AppointmentParams {
  day: number;
  month: number;
  year: number;
}

interface GetProviderAppointmentDTO {
  day: number;
  month: number;
  year: number;
}

export const getProviderAppointments = async <R>({
  day,
  month,
  year,
}: GetProviderAppointmentDTO) => {
  const response = await api.get<R>('/appointments/me', {
    params: {
      day,
      month,
      year,
    } as AppointmentParams,
  });
  return response.data;
};
