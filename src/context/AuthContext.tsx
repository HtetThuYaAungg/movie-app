import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthContextType = {
  logOut: () => void;

  isLoading: boolean;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const initialAuthContext: AuthContextType = {
  logOut: () => {},
  isLoading: false,
  userToken: null,
  setUserToken: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  // const logIn = () => {
  //   setIsLoading(true);
  //   setUserToken('blah');

  //   AsyncStorage.setItem('userToken', 'blah');

  //   setIsLoading(false);
  // };

  const logOut = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log('is login error', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const authContextValue = useMemo(
    () => ({
      logOut,
      isLoading,
      userToken,
      setUserToken,
    }),
    [isLoading, userToken],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuthContext};
