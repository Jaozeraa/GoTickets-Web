import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import ImgLogo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ContentWrapper,
  FormWrapper,
  Form,
  GreetingWrapper,
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { logIn } = useAuth();
  const history = useHistory();

  const handleValidationButton = useCallback(() => {
    const data = formRef.current?.getData() as LoginFormData;
    setButtonDisabled(
      data.email.length > 0 && data.password.length > 0 ? false : true,
    );
  }, []);

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        setButtonLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { user } = await logIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          title: 'Logado com sucesso! Bem vindo',
          type: 'success',
          time: 'medium',
        });

        history.push(user.avatar_url ? '/inicio' : '/criar-avatar');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          if (error.response) {
            if (
              error.response.data?.message ===
              'Email/password combination invalid.'
            ) {
              return addToast({
                title: 'E-mail / Senha inválido!',
                type: 'error',
                time: 'short',
              });
            }
          }

          addToast({
            title: 'Erro na autenticação! Tente novamente',
            type: 'error',
            time: 'short',
          });
        }
      } finally {
        setButtonLoading(false);
      }
    },
    [logIn, history, addToast],
  );

  return (
    <Container>
      <ContentWrapper>
        <FormWrapper>
          <header>
            <img src={ImgLogo} alt="Logo" />
          </header>
          <main>
            <span>LOGIN</span>
            <h1>
              Todo dia é dia de
              <br />
              festejar
            </h1>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                onChange={handleValidationButton}
                name="email"
                label="E-mail"
                placeholder="Seu e-mail"
              />
              <Input
                onChange={handleValidationButton}
                name="password"
                label="Senha"
                type="password"
                placeholder="Sua senha"
              />
              <Button
                style={{ marginTop: 24 }}
                disabled={buttonDisabled}
                loading={buttonLoading}
                type="submit"
              >
                Entrar
              </Button>
            </Form>
            <p>
              Ainda não possui uma conta?{' '}
              <Link to="/registrar">Crie agora</Link>
            </p>
          </main>
        </FormWrapper>
        <GreetingWrapper />
      </ContentWrapper>
    </Container>
  );
};

export default Login;
