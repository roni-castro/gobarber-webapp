import React, { memo } from 'react';
import { AppointmentItem, Container } from './styles';
import { FiClock } from 'react-icons/fi';

interface Appointment {
  date: string;
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
            <li>
              <AppointmentItem>
                <span>
                  <FiClock />
                  {appointment.date}
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
