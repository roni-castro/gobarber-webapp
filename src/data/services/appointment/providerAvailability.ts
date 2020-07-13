import api from '../../api';

interface AppointmentParams {
  month: number;
  year: number;
}

interface ProviderMonthAvailabilityDTO {
  userId: string;
  month: number;
  year: number;
}

export const getProviderMonthAvailability = async <R>(
  params: ProviderMonthAvailabilityDTO,
) => {
  const { userId, month, year } = params;
  const response = await api.get<R>(`/providers/${userId}/month-availability`, {
    params: {
      month,
      year,
    } as AppointmentParams,
  });
  return response.data;
};
