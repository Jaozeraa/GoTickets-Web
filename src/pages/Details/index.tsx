import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import ticketImg from '../../assets/ticket.svg';
import formatValue from '../../utils/formatValue';

import {
  Container,
  ContentWrapper,
  DetailsContainer,
  PromoImageContainer,
  InfosContainer,
  TicketsContainer,
  TicketContainer,
  TicketContent,
} from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RepositoryParams {
  event_id: string;
}

export interface ITicket {
  id: string;
  info: string;
  price: number;
  event_id: string;
}

interface IEvent {
  id: string;
  name: string;
  description: string;
  type: string;
  date: string;
  promo_image_url: string;
  state_city: string;
  street: string;
  neighborhood: string;
  number: string;
  CEP: string;
  available_tickets: number;
  owner_id: string;
  formattedTitleDate: string;
  formattedDate: string;
  tickets: ITicket[];
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/events/details/${params.event_id}`);

      setTickets(response.data.tickets);

      const formattedEvent = {
        ...response.data,
        formattedTitleDate: format(
          new Date(response.data.date),
          "'Dia' dd'/'MM'",
        ),
        formattedDate: format(
          new Date(response.data.date),
          "' 'dd 'de' MMMM 'de' yyyy 'às' HH:mm 'horas",
          {
            locale: ptBR,
          },
        ),
      };

      setEvent(formattedEvent);
    })();
  }, [params]);

  return (
    <>
      <Header />
      <Container>
        <ContentWrapper>
          <DetailsContainer>
            <section>
              <div>
                <p>{event.type}</p>
                <h1>{event.name}</h1>
                <InfosContainer>
                  <div>
                    <FiMapPin size={24} color="#E13352" />
                    <h1>{event.state_city}</h1>
                    <p>{`${event.street} - ${event.neighborhood}, ${event.number}`}</p>
                  </div>
                  <div>
                    <FiCalendar size={24} color="#E13352" />
                    <h1>{event.formattedTitleDate}</h1>
                    <p>{event.formattedDate}</p>
                  </div>
                </InfosContainer>
                <h2>{event.description}</h2>
                <TicketsContainer>
                  <h1>Ingressos</h1>
                  <p>{`Disponíveis ${event.available_tickets}`}</p>
                  <div>
                    {tickets.map(ticket => (
                      <TicketContainer key={ticket.id}>
                        <img src={ticketImg} alt={ticket.info} />
                        <TicketContent>
                          <p>{ticket.info}</p>
                          <h1>{formatValue(ticket.price)}</h1>
                        </TicketContent>
                      </TicketContainer>
                    ))}
                  </div>
                </TicketsContainer>
              </div>
            </section>
          </DetailsContainer>
          <PromoImageContainer>
            <img src={event.promo_image_url} alt={event.name} />
          </PromoImageContainer>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Details;
