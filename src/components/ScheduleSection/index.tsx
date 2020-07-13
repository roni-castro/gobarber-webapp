import React, { memo } from 'react';
import { FiClock } from 'react-icons/fi';
import { AppointmentItem, Container } from './styles';

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  client: {
    name: string;
    avatar_url: string;
  };
}

interface ScheduleSectionProps {
  title: string;
  appointments: Appointment[];
}

const ScheduleSection: React.FC<ScheduleSectionProps> = memo(
  ({ title, appointments }) => {
    return (
      <Container>
        <strong>{title}</strong>
        {appointments.length === 0 && <p>Nenhum agentamento neste período</p>}
        <hr />
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <AppointmentItem>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.client.avatar_url}
                    alt={appointment.client.name}
                  />
                  <strong>{appointment.client.name}</strong>
                </div>
              </AppointmentItem>
            </li>
          ))}
        </ul>
      </Container>
    );
  },
);

export default ScheduleSection;
