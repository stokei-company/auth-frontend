import { useEffect } from 'react';
import { AppModel } from '~/services/@types/app';
import { clientRestApi } from '~/services/rest-api';
import { AppServiceRest } from '~/services/rest-api/services/app/app.service';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly app: AppModel;
}

export const useApp = ({ appId }): UseAppResponse => {
  const appService = clientRestApi({ appId });

  const { data, loading, submit } = useRequest({
    submit: () => appService.apps.findById(appId)
  });

  useEffect(() => {
    (async () => {
      try {
        if (appId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [appId]);

  return {
    app: data,
    loading
  };
};
