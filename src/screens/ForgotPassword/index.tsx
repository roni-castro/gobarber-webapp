import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Background, Container, Content, AnimationContainer } from './styles';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import ToastContext from '../../hooks/ToastContext';
import { forgotPassword } from '../../data/services/user/forgotPassword';

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = ToastContext.useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, { abortEarly: false });
        await forgotPassword(data.email);
        addToast({
          type: 'success',
          title: 'Email de recuperação de senha enviado com sucesso',
          description:
            'Enviamos um email para confirmar a recuperação de senha, verifique a caixa de entrada!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação da senha',
          description:
            'Ocorreu um erro na recuperação da senha. Tente novamente!',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoBarber logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button isLoading={isLoading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
