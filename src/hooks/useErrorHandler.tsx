import {View, Text} from 'react-native';
import React from 'react';
import {Error, useErrorHandlerContext} from '../context/ErrorHandlerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../context/AuthContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const useErrorHandler = () => {
  const {setUserToken} = useAuthContext();
  const {setError} = useErrorHandlerContext();

  const customHandleError = async (error: any) => {
    setError(() => error);
    console.log('custom', error.statusCode);

    const errorStatusCode = error.statusCode;
    if (errorStatusCode === 401) {
      AsyncStorage.removeItem('userToken');
      setUserToken(null);
      await GoogleSignin.signOut();
    }
  };

  return {customHandleError};
};

export default useErrorHandler;
