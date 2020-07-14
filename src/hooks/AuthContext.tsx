import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../data/api';
import { TOKEN, USER_INFO } from '../data/auth/authStorageConstants';
import AuthDTO from '../data/models/AuthDTO';
import UserData from '../data/models/UserData';
import { updateAvatar } from '../data/services/user/profile';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage';

interface Auth {
  user: UserData;
  token: string;
}

interface AuthContextData {
  auth: Auth;
  signIn(email: string, password: string): Promise<Auth>;
  signOut(): void;
  updateUserAvatar(formData: FormData): void;
}

const defaultValue = {} as AuthContextData;

const AuthContext = createContext(defaultValue);

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC = (props: any): JSX.Element => {
  const [auth, setAuth] = useState<Auth>(() => {
    const user = getStorageItem<UserData>(USER_INFO);
    const token = getStorageItem<string>(TOKEN);
    if (user && token) {
      return { user, token };
    }
    return {} as Auth;
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await api.post<AuthDTO>('/sessions', {
      email,
      password,
    });
    const { data } = response;
    setAuth({
      user: data.user,
      token: data.token,
    });
    setStorageItem(TOKEN, data.token);
    setStorageItem(USER_INFO, data.user);
  }, []);

  const signOut = (): void => {
    removeStorageItem(TOKEN);
    removeStorageItem(USER_INFO);
    setAuth({} as Auth);
  };

  const updateUserAvatar = useCallback(async (formData: FormData) => {
    const user = await updateAvatar<UserData>(formData);
    setStorageItem(USER_INFO, user);
    setAuth(auth => ({
      ...auth,
      user,
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, signIn, signOut, updateUserAvatar }}
      {...props}
    />
  );
};

export default {
  useAuth,
  AuthProvider,
};
