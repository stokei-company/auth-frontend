import { useEffect } from 'react';
import { UserModel } from '~/services/@types/user';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseAuthResponse {
  readonly user: UserModel;
  readonly loading: boolean;
}

export const useAuth = (): UseAuthResponse => {
  const meService = clientRestApi();

  const { data, loading, submit } = useRequest({
    submit: () => meService.me.load()
  });

  useEffect(() => {
    (async () => {
      try {
        await submit();
      } catch (error) {}
    })();
  }, []);

  return {
    user: data,
    loading
  };
};
