import React, { useRef, useCallback, ChangeEvent } from 'react';
import Header from '../../components/Header';
import { FiCamera } from 'react-icons/fi';
import ImgLogo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';

import { Container, Form, AvatarInput } from './styles';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser, signOut } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso!',
            time: 'short',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .min(6, 'Senha curta demais')
              .required('Senha nova obrigatória'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Confirmar senha obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/inicio');

        addToast({
          title: 'Perfil atualizado com sucesso!',
          type: 'success',
          time: 'short',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Houve um erro ao atualizar seus dados. Tente novamente',
          type: 'error',
          time: 'medium',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <>
      <Header />
      <Container>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url || ImgLogo} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera size={20} color="#ffffff" />
              <input
                data-testid="input-file"
                type="file"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <Input
            name="name"
            label="Nome completo"
            placeholder="Digite seu nome"
          />

          <Input name="email" label="E-mail" placeholder="Digite seu e-mail" />

          <Input
            name="old_password"
            label="Senha atual"
            type="password"
            placeholder="Digite sua senha"
          />
          <Input
            name="password"
            label="Nova senha"
            type="password"
            placeholder="Digite sua nova senha"
          />
          <Input
            name="password_confirmation"
            label="Confirmar senha"
            type="password"
            placeholder="Confirme sua senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
          <Button background="#BB3352" onClick={signOut}>
            Deslogar da plataforma
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
