import React, {ReactNode} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';

interface InputFieldTypeProps {
  label: string;
  icon: ReactNode;
  onChangeText: () => void;
  onBlur: () => void;
  value: string;
  inputType?: string;
  keyboardType?: KeyboardTypeOptions;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  rest?: any;
}

export const InputField = ({
  label,
  icon,
  onChangeText,
  onBlur,
  value,
  inputType,
  keyboardType = 'default',
  fieldButtonLabel,
  fieldButtonFunction,
  rest,
}: InputFieldTypeProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          placeholderTextColor={'#fff'}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#eab308'}}
          secureTextEntry={true}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          ref={rest}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor={'#fff'}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#eab308'}}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          ref={rest}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: 'red', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
