import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../data/api';
import ToastContext from '../../hooks/ToastContext';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { Background, Container, Content } from './styles';

interface InputData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = ToastContext.useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: InputData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(
            6,
            'Senha deve ter pelo menos 6 caracteres',
          ),
        });
        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Você já pode fazer seu logon',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar o usuário',
          description: error.response.data?.message,
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="GoBarber logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
    </Container>
  );
};

export default Signup;
