import { format, isAfter, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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

interface Appointment {
  id: string;
  date: Date;
  hourFormatted: string;
  client: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    signOut,
    auth: { user },
  } = AuthContext.useAuth();

  useEffect(() => {
    const mapToAppointments = (
      apointments: AppointmentData[],
    ): Appointment[] => {
      return apointments.map(appointment => {
        return {
          ...appointment,
          date: parseISO(appointment.date),
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        };
      });
    };
    const fetchData = async (): Promise<void> => {
      const appointmentsResponse = await getProviderAppointments<
        AppointmentData[]
      >({
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      });
      setAppointments(mapToAppointments(appointmentsResponse));
    };

    fetchData();
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => appointment.date.getHours() < 12);
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      appointment => appointment.date.getHours() >= 12,
    );
  }, [appointments]);

  const todayDayOfWeek = useMemo(() => {
    return format(selectedDate, 'EEEE', { locale: ptBR });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    if (!modifiers.available || modifiers.disabled) {
      return;
    }
    setSelectedDate(day);
  }, []);

  const isSelectedDateToday = useMemo(() => isToday(selectedDate), [
    selectedDate,
  ]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(appointment.date, new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="Gobarber logo" />
          <Profile>
            <img src={user.avatar_url} alt="Profile" />
            <div>
              <span>Bem vindo,</span>
              <strong>
                <Link to="/profile">{user.name}</Link>
              </strong>
            </div>
          </Profile>
          <button type="button">
            <FiPower onClick={signOut} />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isSelectedDateToday && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{todayDayOfWeek}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            {isSelectedDateToday && nextAppointment ? (
              <div>
                <img
                  src={nextAppointment.client.avatar_url}
                  alt={nextAppointment.client.name}
                />
                <strong>{nextAppointment.client.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
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
            selectedDays={[selectedDate]}
            fromMonth={new Date()}
            onDayClick={handleDayClick}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
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
