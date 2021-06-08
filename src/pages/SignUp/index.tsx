import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import ImgLogo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  ContentWrapper,
  FormWrapper,
  Form,
  GreetingWrapper,
} from './styles';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleValidationButton = useCallback(() => {
    const data = formRef.current?.getData() as SignUpFormData;
    setButtonDisabled(
      data.name.length > 0 && data.email.length > 0 && data.password.length > 0
        ? false
        : true,
    );
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        setButtonLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup
            .string()
            .min(2, 'Nome curto demais')
            .required('Nome obrigatório'),
          email: yup
            .string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: yup
            .string()
            .min(4, 'Senha curta demais')
            .required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', {
          email: data.email,
          name: data.name,
          password: data.password,
        });
        addToast({
          title: 'Conta criada com sucesso! Você já logar no GoTickets.',
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
              error.response.data?.message === 'This email is already taken.'
            ) {
              return addToast({
                title: 'Este e-mail já está em uso!',
                type: 'error',
                time: 'short',
              });
            }
          }

          addToast({
            title: 'Erro ao criar uma conta! Tente novamente',
            type: 'error',
            time: 'short',
          });
        }
      } finally {
        setButtonLoading(false);
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <ContentWrapper>
        <GreetingWrapper />
        <FormWrapper>
          <header>
            <img src={ImgLogo} alt="Logo" />
          </header>
          <main>
            <span>CADASTRO</span>
            <h1>
              Crie sua conta e
              <br />
              bora pro show
            </h1>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                onChange={handleValidationButton}
                name="name"
                label="Nome completo"
                placeholder="Digite seu nome"
              />
              <Input
                onChange={handleValidationButton}
                name="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
              />
              <Input
                onChange={handleValidationButton}
                name="password"
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
              />
              <Button
                style={{ marginTop: 24 }}
                disabled={buttonDisabled}
                loading={buttonLoading}
                type="submit"
              >
                Cadastrar
              </Button>
            </Form>
            <p>
              <Link to="/">Voltar para o Login</Link>
            </p>
          </main>
        </FormWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default Login;
