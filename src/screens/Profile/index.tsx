import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthContext from '../../hooks/AuthContext';
import ToastContext from '../../hooks/ToastContext';
import { mapValidationErrorToErrorObject } from '../../utils/errorObjectMapper';
import { AvatarInput, Container, Content } from './styles';

interface InputData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    auth: { user },
  } = AuthContext.useAuth();
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
          password: Yup.string(),
          oldPassword: Yup.string().when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'Senha atual é necessária',
            ),
          }),
          passwordConfirmation: Yup.string().when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'As senhas precisam ser iguais',
            ),
          }),
        });
        await schema.validate(data, { abortEarly: false });
        // await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso',
        });
        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(mapValidationErrorToErrorObject(error));
        }
        // addToast({
        //   type: 'error',
        //   title: 'Erro ao atualizar o usuário',
        //   description: error.response.data?.message,
        // });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft onClick={() => history.goBack()} />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
