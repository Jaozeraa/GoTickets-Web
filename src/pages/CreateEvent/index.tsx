import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles, Scope } from '@unform/core';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import Header from '../../components/Header';
import Input from '../../components/Input';
import MaskedInput from '../../components/MaskedInput';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Form,
  InputsInLine,
  TicketsHeader,
  TicketForm,
} from './styles';
import Dropzone from '../../components/Dropzone';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface TicketFormData {
  info: string;
  price: number;
}

interface CreateEventFormData {
  name: string;
  available_tickets: number;
  description: string;
  type: string;
  event_date: string;
  hour: string;
  CEP: string;
  street: string;
  state_city: string;
  neighborhood: string;
  number: string;
  tickets: TicketFormData[];
}

const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const [ticketsAmount, setTicketsAmount] = useState(1);
  const [file, setFile] = useState<File>();

  const addZeroIfNoDoubleNumbers = useCallback(number => {
    return String(number).length > 1 ? number : `0${number}`;
  }, []);

  const events = useMemo(() => {
    return [
      {
        value: 'Show',
        label: 'Show',
      },
      {
        value: 'Festa',
        label: 'Festa',
      },
    ];
  }, []);

  const availableHours = useMemo(() => {
    const hours = [];

    for (let i = 0; i < 24; i++) {
      const hour = addZeroIfNoDoubleNumbers(i);

      hours.push({
        label: `${hour}:00`,
        value: Number(hour),
      });
    }

    return hours;
  }, [addZeroIfNoDoubleNumbers]);

  const handleIncrementTicketsAmount = useCallback(() => {
    setTicketsAmount(state => {
      const statePlusOne = state + 1;

      if (statePlusOne >= 6) {
        return 6;
      }

      return statePlusOne;
    });
  }, []);

  const handleDecrementTicketsAmount = useCallback(() => {
    setTicketsAmount(state => {
      const stateMinusOne = state - 1;

      if (stateMinusOne <= 1) {
        return 1;
      }

      return stateMinusOne;
    });
  }, []);

  const handleFileUploaded = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateEventFormData) => {
      try {
        formRef.current?.setErrors({});
        const types = events.map(event => event.value);

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          available_tickets: yup.string().required('Quantidade obrigatória'),
          description: yup.string().required('Descrição obrigatória'),
          type: yup
            .string()
            .oneOf(types, 'Selecione uma opção')
            .required('Tipo obrigatório'),
          event_date: yup
            .string()
            .matches(/\d{2}\/\d{2}\/\d{4}/, 'Formato inválido')
            .required('Data obrigatória'),
          hour: yup.string().required('Hora obrigatória'),
          CEP: yup.string().required('CEP obrigatório'),
          street: yup.string().required('Rua obrigatória'),
          state_city: yup.string().required('Cidade obrigatória'),
          neighborhood: yup.string().required('Bairro obrigatório'),
          number: yup.string().required('Número obrigatório'),
          tickets: yup
            .array(
              yup.object().shape({
                info: yup.string().required('Nome obrigatório'),
                price: yup.string().required('Preço obrigatório'),
              }),
            )
            .required('Ingresso obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formdata = new FormData();

        const {
          name,
          available_tickets,
          description,
          type,
          event_date,
          hour,
          CEP,
          street,
          state_city,
          neighborhood,
          number,
          tickets,
        } = data;

        const date = new Date();
        const [day, month, year] = event_date.split('/');

        date.setDate(Number(day));
        date.setMonth(Number(month) - 1);
        date.setFullYear(Number(year));
        date.setHours(Number(hour));
        date.setMinutes(0);

        if (!file) {
          return addToast({
            title: 'Você não pode criar um evento sem uma imagem promocional!',
            type: 'error',
            time: 'medium',
          });
        }

        formdata.append('promo_image', file);
        formdata.append('name', name);
        formdata.append('available_tickets', String(available_tickets));
        formdata.append('description', description);
        formdata.append('type', type);
        formdata.append('date', date.toISOString());
        formdata.append('CEP', CEP);
        formdata.append('street', street);
        formdata.append('state_city', state_city);
        formdata.append('neighborhood', neighborhood);
        formdata.append('number', number);

        const response = await api.post('/events', formdata);

        await api.post(`/tickets/${response.data.id}`, {
          tickets,
        });

        addToast({
          title: 'Evento criado com sucesso!',
          type: 'success',
          time: 'medium',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          if (error.response) {
            if (
              error.response.data?.message ===
              'You cannot create an event for before now.'
            ) {
              return addToast({
                title: 'Você não pode criar um evento nesta data!',
                type: 'error',
                time: 'medium',
              });
            }
          }

          addToast({
            title: 'Erro ao criar evento. Tente novamente',
            type: 'error',
            time: 'medium',
          });
        }
      }
    },
    [events, addToast, file, history],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>
            Cadastro de
            <br />
            eventos
          </h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Dropzone onFileUploaded={handleFileUploaded} />

            <h1>Dados</h1>
            <InputsInLine>
              <Input
                name="name"
                label="Nome do evento"
                placeholder="Digite o nome"
              />
              <Input
                name="available_tickets"
                label="Ingressos disponíveis"
                placeholder="Digite a quantidade"
                type="number"
              />
            </InputsInLine>
            <InputsInLine style={{ marginTop: 16 }}>
              <MaskedInput
                mask="99/99/9999"
                name="event_date"
                label="Data"
                placeholder="Digite a data"
              />
              <Select name="hour" label="Hora" options={availableHours} />
              <Select name="type" label="Tipo do evento" options={events} />
            </InputsInLine>
            <Textarea
              name="description"
              label="Descrição do evento"
              placeholder="Escreva um pouco sobre o evento"
              containerStyle={{ marginTop: 16 }}
            />
            <h1>Endereço</h1>
            <InputsInLine>
              <Input name="CEP" label="CEP" placeholder="Digite o CEP" />
              <Input
                name="state_city"
                label="Cidade"
                placeholder="Digite a cidade"
              />
              <Input name="street" label="Rua" placeholder="Digite a rua" />
            </InputsInLine>
            <InputsInLine style={{ marginTop: 16 }}>
              <Input
                name="neighborhood"
                label="Bairro"
                placeholder="Digite o bairro"
              />
              <Input
                name="number"
                label="Número"
                placeholder="Digite o número"
                type="number"
              />
            </InputsInLine>
            <TicketsHeader>
              <h1>Ingressos</h1>
              <div>
                <button type="button" onClick={handleIncrementTicketsAmount}>
                  <FiPlus color="#E13352" size={24} />
                </button>
                <button type="button" onClick={handleDecrementTicketsAmount}>
                  <FiMinus color="#E13352" size={24} />
                </button>
              </div>
            </TicketsHeader>
            {Array.from({ length: ticketsAmount }).map((_, index) => (
              <Scope path={`tickets[${index}]`} key={uuid()}>
                <TicketForm>
                  <Input
                    name="info"
                    label="Nome do ingresso"
                    placeholder="Digite o nome"
                  />
                  <Input
                    name="price"
                    label="Preço"
                    placeholder="Digite o preço"
                    type="number"
                  />
                </TicketForm>
              </Scope>
            ))}
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default CreateEvent;
