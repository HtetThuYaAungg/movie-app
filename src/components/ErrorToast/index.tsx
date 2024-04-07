import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useErrorHandlerContext} from '../../context/ErrorHandlerContext';
import Toast from 'react-native-toast-message';

const ErrorToast = () => {
  const {error} = useErrorHandlerContext();

  useEffect(() => {
    if (error) {
      let errorMessages: any = [];

      if (Array.isArray(error.message)) {
        errorMessages = error.message;
      } else if (typeof error.message === 'string') {
        errorMessages = [error.message];
      }

      errorMessages.forEach((message: any) => {
        Toast.show({
          type: 'error',
          text1: message,
          position: 'top',

          text1Style: {
            textAlign: 'center',
          },
        });
      });
    }
  }, [error]);

  return (
    <>
      <Toast />
    </>
  );
};

export default ErrorToast;

const styles = StyleSheet.create({});
