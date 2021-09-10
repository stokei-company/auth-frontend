import { useRouter } from 'next/router';
import React from 'react';

export interface RootContextValues {
  readonly redirectUri: string;
}

interface Props {}

export const RootContext = React.createContext<RootContextValues>(
  {} as RootContextValues
);

const RootContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <RootContext.Provider
      value={{
        redirectUri: (router?.query?.redirectUri + '').trim()
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
