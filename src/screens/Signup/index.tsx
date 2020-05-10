import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { Background, Container, Content } from './styles';

interface InputData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: InputData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
      }
    }
  }, []);

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
