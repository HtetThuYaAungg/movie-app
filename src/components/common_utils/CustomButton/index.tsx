import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  label: string;
  onPress: any;
}

export const CustomButton = ({label, onPress}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#eab308',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
