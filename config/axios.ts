import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { authHeader } from '~/utils/auth';
import { AUTH_SERVER_URL } from '../environments';

export const axiosClient = axios.create({
  baseURL: AUTH_SERVER_URL,
  headers: {
    'Content-type': 'application/json',
    ...authHeader()
  }
});

interface RequestProps extends AxiosRequestConfig {}

interface RequestPayload<TData = any> {
  readonly data: TData;
  readonly error: any;
}

export function useRequest(props: RequestProps): RequestPayload[] {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosClient(props);
        if (response && response.data) {
          setData(response.data);
        } else {
          setData(null);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return [{ data, error }];
}
