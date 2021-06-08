import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import {
  Container,
  ContainerHeader,
  EventsContainer,
  EventContainer,
  DeleteButton,
} from './styles';

interface IEvent {
  id: string;
  promo_image_url: string;
  name: string;
  type: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('/events/?me=true');
      setEvents(response.data);
    })();
  }, []);

  const handleDeleteEvent = useCallback(
    async (event_id: string) => {
      try {
        await api.delete(`/events/${event_id}`);

        const filteredEvents = events.filter(event => event.id !== event_id);
        setEvents(filteredEvents);
        addToast({
          title: 'Evento deletado com sucesso!',
          type: 'success',
          time: 'medium',
        });
      } catch {
        addToast({
          title: 'Houve um erro ao deletar este evento. Tente novamente',
          type: 'error',
          time: 'medium',
        });
      }
    },
    [events, addToast],
  );

  return (
    <>
      <Header />
      <Container>
        <ContainerHeader>
          <h1>Seus eventos</h1>
          <Button onClick={() => history.push('/criar-evento')}>
            Cadastrar evento
          </Button>
        </ContainerHeader>
        <EventsContainer>
          {events.map(event => (
            <EventContainer key={event.id}>
              <button
                tabIndex={1}
                onClick={() => history.push(`/evento/${event.id}`)}
              >
                <img src={event.promo_image_url} alt={event.name} />
                <div>
                  <p>{event.type}</p>
                  <h1>{event.name}</h1>
                </div>
              </button>
              <DeleteButton
                tabIndex={2}
                onClick={() => handleDeleteEvent(event.id)}
              >
                <FiTrash size={20} color="#212529" />
              </DeleteButton>
            </EventContainer>
          ))}
        </EventsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
