import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';

type Props = {
  showToast: boolean;
  message: string;
  type: string;
};

const CustomToast = ({showToast, message, type}: Props) => {
  useEffect(() => {
    if (showToast) {
      Toast.show({
        type: type,
        text1: message,
        text1Style: {
          textAlign: 'center',
        },
      });
    }
  }, [showToast]);

  return (
    <>
      <Toast />
    </>
  );
};

export default CustomToast;
