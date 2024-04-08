import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  CustomButton,
  CustomToast,
  InputField,
} from '../components/common_utils';
import {
  InboxIcon,
  LockClosedIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {NavigationAuthStackScreenProps} from '../navigation/AuthNavigator';
import useErrorHandler from '../hooks/useErrorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../context/AuthContext';
import {userRegister} from '../api_services/userAuthService';

export type RegisterFormType = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  navigation: NavigationAuthStackScreenProps['navigation'];
};

const RegisterScreen = ({navigation}: Props) => {
  const {setUserToken} = useAuthContext();
  const {customHandleError} = useErrorHandler();

  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<RegisterFormType>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormType> = async registerData => {
    console.log(registerData);
    try {
      setShowLoadingModal(true);
      const result = await userRegister(registerData);
      // console.log('hello');
      // console.log('result', result);
      // const token = result.data.accessToken;
      const token = result.response.accessToken;
      console.log('token>>>>>', token);
      if (token) {
        setUserToken(token);
        AsyncStorage.setItem('userToken', token as string);
      }
    } catch (err: any) {
      // console.log('rr>>', err);
      customHandleError(err);
    } finally {
      setShowLoadingModal(false);
    }
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#1a202c'}}>
        <View style={{paddingHorizontal: 25, gap: 20}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/loginflim.png')}
              style={{width: 150, height: 150}}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 28,
                fontWeight: '600',
                color: '#eab308',
                marginBottom: 30,
              }}>
              Register
            </Text>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={'User Name'}
                  icon={
                    <UserIcon
                      size={20}
                      color="#eab308"
                      style={{marginRight: 5}}
                    />
                  }
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="userName"
            />
            {errors.userName && (
              <Text style={styles.validationMessage}>
                User name is required.
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={'Email'}
                  icon={
                    <InboxIcon
                      size={20}
                      color="#eab308"
                      style={{marginRight: 5}}
                    />
                  }
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.validationMessage}>
                {errors.email.message}
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={'Password'}
                  inputType="password"
                  icon={
                    <LockClosedIcon
                      size={20}
                      color="#eab308"
                      style={{marginRight: 5}}
                    />
                  }
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.validationMessage}>
                {errors.password.message}
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: 'Confirm Password is required',
                validate: (value: string) =>
                  value === password.current || 'The passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label={'Confirm Password'}
                  inputType="password"
                  icon={
                    <LockClosedIcon
                      size={20}
                      color="#eab308"
                      style={{marginRight: 5}}
                    />
                  }
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.validationMessage}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <CustomButton label={'Register'} onPress={handleSubmit(onSubmit)} />
          <View>
            <Text
              style={{textAlign: 'center', color: '#fff', marginBottom: 30}}>
              Already have an account?{' '}
              <Text
                style={{color: '#eab308'}}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Login here
              </Text>
            </Text>
          </View>
        </View>
        <Modal visible={showLoadingModal} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#eab308" />
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  validationMessage: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
