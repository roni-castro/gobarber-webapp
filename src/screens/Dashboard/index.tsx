import React, { useEffect, useState, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Logo from '../../assets/logo.svg';
import AuthContext from '../../hooks/AuthContext';
import ScheduleSection from '../../components/ScheduleSection';
import { getProviderAppointments } from '../../data/services/appointment/providerAppointments';
import AppointmentData from '../../data/models/AppointmentData';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from './styles';

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    signOut,
    auth: { user },
  } = AuthContext.useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const appointments = await getProviderAppointments<AppointmentData[]>();
      setAppointments(appointments);
    };
    fetchData();
  }, []);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  const todayDayOfWeek = useMemo(() => {
    return format(selectedDate, 'EEEE', { locale: pt });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="Gobarber logo" />
          <Profile>
            <img src={user.avatar_url} alt="Profile" />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button>
            <FiPower onClick={signOut} />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>{`Dia ${selectedDate.getDate()}`}</span>
            <span>{todayDayOfWeek}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            {appointments.length > 0 ? (
              <div>
                <img
                  src={appointments[0].client.avatar_url}
                  alt={appointments[0].client.name}
                />
                <strong>{appointments[0].client.name}</strong>
                <span>
                  <FiClock />
                  {format(parseISO(appointments[0].date), 'HH:mm')}
                </span>
              </div>
            ) : (
              <p>Nenhum agendamento</p>
            )}
          </NextAppointment>
          <ScheduleSection title="Manhã" appointments={morningAppointments} />
          <ScheduleSection title="Tarde" appointments={afternoonAppointments} />
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
