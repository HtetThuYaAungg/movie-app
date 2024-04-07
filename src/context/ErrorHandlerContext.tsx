import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import ErrorToast from '../components/ErrorToast';

interface Props {
  children: ReactNode;
}

export type Error = {
  message: string | string[];
  code: number;
};

type ErrorContextType = {
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
};

const ErrorHandlerContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});

const useErrorHandlerContext = (): ErrorContextType => {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ErrorHandlerPorvider = ({children}: Props) => {
  const [error, setError] = useState<Error | null>(null);

  const errorHandlerContextValue = useMemo(
    () => ({
      error,
      setError,
    }),
    [error],
  );

  return (
    <ErrorHandlerContext.Provider value={errorHandlerContextValue}>
      {children}
      <ErrorToast />
    </ErrorHandlerContext.Provider>
  );
};

export {ErrorHandlerPorvider, useErrorHandlerContext};
