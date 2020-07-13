import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { resetPassword } from '../../data/services/user/resetPassword';
import ToastContext from '../../hooks/ToastContext';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { AnimationContainer, Background, Container, Content } from './styles';

interface FormResetPasswordData {
  password: string;
  confirmationPassword: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = ToastContext.useToast();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormResetPasswordData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required(),
          confirmationPassword: Yup.string().when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'As senhas precisam ser iguais',
            ),
          }),
        });
        await schema.validate(data, { abortEarly: false });
        const token = new URLSearchParams(location.search).get('token');
        if (!token) {
          throw new Error('Token not found');
        }
        await resetPassword({
          token,
          password: data.password,
          confirmPassword: data.confirmationPassword,
        });
        history.push('/');
      } catch (e) {
        if (e instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(e));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar a senha. Tente novamente!',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, location, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova senha"
            />
            <Input
              type="password"
              name="confirmationPassword"
              icon={FiLock}
              placeholder="Confirmação da senha"
            />
            <Button isLoading={isLoading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
