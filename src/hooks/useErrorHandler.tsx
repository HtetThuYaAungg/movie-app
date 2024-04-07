import {View, Text} from 'react-native';
import React from 'react';
import {Error, useErrorHandlerContext} from '../context/ErrorHandlerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useErrorHandler = () => {
  const {setError} = useErrorHandlerContext();

  const customHandleError = (error: any) => {
    setError(() => error);
    // console.log('custom', error);
    const errorStatusCode = error.statusCode;
    if (errorStatusCode === 401) {
      AsyncStorage.removeItem('userToken');
    }
  };

  return {customHandleError};
};

export default useErrorHandler;
