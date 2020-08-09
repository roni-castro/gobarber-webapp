import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import api from '../../data/api';
import { TOKEN, USER_INFO } from '../../data/auth/authStorageConstants';
import AuthContext from '../../hooks/AuthContext';
import * as LocalStorage from '../../utils/storage';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be to able to login and save the data', async () => {
    const signInResponse = {
      user: {
        id: 'userId',
        name: 'User name',
        email: 'test@email.com',
      },
      token: 'token',
    };
    apiMock.onPost('sessions').reply(200, signInResponse);
    const setStorageItemSpy = jest.spyOn(LocalStorage, 'setStorageItem');

    const { result, waitForNextUpdate } = renderHook(
      () => AuthContext.useAuth(),
      {
        wrapper: AuthContext.AuthProvider,
      },
    );
    result.current.signIn('test@email.com', '123456');
    await waitForNextUpdate();

    expect(result.current.auth.user.email).toBe('test@email.com');
    expect(setStorageItemSpy).toHaveBeenCalledWith(TOKEN, signInResponse.token);
    expect(setStorageItemSpy).toHaveBeenCalledWith(
      USER_INFO,
      signInResponse.user,
    );
  });

  it('should be able to load the authorization data in cache successfully', async () => {
    const userDataInCache = {
      id: 'userId',
      name: 'User name',
      email: 'test@email.com',
    };
    jest
      .spyOn(LocalStorage, 'getStorageItem')
      .mockReturnValueOnce(userDataInCache);
    jest.spyOn(LocalStorage, 'getStorageItem').mockReturnValueOnce('token');

    const { result, waitFor } = renderHook(() => AuthContext.useAuth(), {
      wrapper: AuthContext.AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.auth.user).toBe(userDataInCache);
    });
  });

  it('should clear cache data after signOut', async () => {
    jest.spyOn(LocalStorage, 'getStorageItem').mockReturnValueOnce({
      id: 'userId',
      name: 'User name',
      email: 'test@email.com',
    });
    jest.spyOn(LocalStorage, 'getStorageItem').mockReturnValueOnce('token');
    const removeStorageItemSpy = jest.spyOn(LocalStorage, 'removeStorageItem');

    const { result } = renderHook(() => AuthContext.useAuth(), {
      wrapper: AuthContext.AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.auth.user).toBeUndefined();
    expect(removeStorageItemSpy).toHaveBeenNthCalledWith(1, TOKEN);
    expect(removeStorageItemSpy).toHaveBeenNthCalledWith(2, USER_INFO);
  });

  it('should be to able to update user profile data', async () => {
    const dataToBeUpdated = {
      name: 'User name updated',
      email: 'test-updated@email.com',
    };
    const updateUserResponse = {
      id: 'userId',
      ...dataToBeUpdated,
    };
    apiMock.onPut('user').reply(200, updateUserResponse);
    const setStorageItemSpy = jest.spyOn(LocalStorage, 'setStorageItem');

    const { result, waitForNextUpdate } = renderHook(
      () => AuthContext.useAuth(),
      {
        wrapper: AuthContext.AuthProvider,
      },
    );
    result.current.updateUserProfile(dataToBeUpdated);
    await waitForNextUpdate();

    expect(result.current.auth.user).toMatchObject(updateUserResponse);
    expect(setStorageItemSpy).toHaveBeenCalledWith(
      USER_INFO,
      updateUserResponse,
    );
  });

  it('should be to able to update user avatar data', async () => {
    const dataToBeUpdated = new FormData();
    dataToBeUpdated.append('avatar', 'new-avatar.jpg');
    const updateUserAvatarResponse = {
      id: 'userId',
      name: 'User name',
      email: 'test@email.com',
      avatar: 'new-avatar.jpg',
      avatar_url: 'https://www.test.com/new-avatar.jpg',
    };
    apiMock.onPatch('users/avatar').reply(200, updateUserAvatarResponse);
    const setStorageItemSpy = jest.spyOn(LocalStorage, 'setStorageItem');

    const { result, waitForNextUpdate } = renderHook(
      () => AuthContext.useAuth(),
      {
        wrapper: AuthContext.AuthProvider,
      },
    );
    result.current.updateUserAvatar(dataToBeUpdated);
    await waitForNextUpdate();

    expect(result.current.auth.user).toMatchObject(updateUserAvatarResponse);
    expect(setStorageItemSpy).toHaveBeenCalledWith(
      USER_INFO,
      updateUserAvatarResponse,
    );
  });
});
