import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

interface ButtonPorps {
  onPress?: () => void;
  title: string;
  customButtonStyle?: object;
  customButtonTextStyle?: object;
}

const CustomButton = ({
  onPress,
  title,
  customButtonStyle,
  customButtonTextStyle,
}: ButtonPorps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={customButtonStyle ? customButtonStyle : styles.button}>
      <Text style={customButtonTextStyle ? customButtonTextStyle : styles.text}>
        {' '}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        backgroundColor: 'lightblue',
        borderRadius: 15,
        padding: 10,
      },
      android: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        padding: 10,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Platform.select({
      ios: {
        color: 'white',
        fontSize: 18,
      },
      android: {
        color: 'white',
        fontSize: 20,
      },
    }),
  },
});

export default CustomButton;
