import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import Logo from '../../assets/logo.svg';
import ScheduleSection from '../../components/ScheduleSection';
import AppointmentData from '../../data/models/AppointmentData';
import { getProviderAppointments } from '../../data/services/appointment/providerAppointments';
import AuthContext from '../../hooks/AuthContext';
import {
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
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

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    if (!modifiers.available) {
      return;
    }
    setSelectedDate(day);
  }, []);

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
        <Calendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={[selectedDate]}
            fromMonth={new Date()}
            onDayClick={handleDayClick}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
