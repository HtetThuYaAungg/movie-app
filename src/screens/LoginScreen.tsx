import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import LoginSVG from '../assets/login.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import {CustomButton, InputField} from '../components/common_utils';

import {InboxIcon} from 'react-native-heroicons/outline';
import {LockClosedIcon} from 'react-native-heroicons/outline';
import {useAuthContext} from '../context/AuthContext';
import {
  ConfigureParams,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {NavigationAuthStackScreenProps} from '../navigation/AuthNavigator';
import {
  checkIfUserExists,
  userLogin,
  userRegister,
} from '../api_services/userAuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useErrorHandler from '../hooks/useErrorHandler';
import {RegisterFormType} from './RegisterScreen';

type Props = {
  navigation: NavigationAuthStackScreenProps['navigation'];
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type CheckEmailType = {
  email: string;
};

const LoginScreen = ({navigation}: Props) => {
  const {userToken, isLoading, setUserToken} = useAuthContext();
  const {width} = useWindowDimensions();
  const {customHandleError} = useErrorHandler();
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      test: '457067784334-0i37te0egs3afspj1qu5mo9ir1rc494s.apps.googleusercontent.com', // Replace with your web client ID
    } as ConfigureParams);
  }, []);

  // GoogleSignin.configure({
  //   webClientId:
  //     '457067784334-0i37te0egs3afspj1qu5mo9ir1rc494s.apps.googleusercontent.com',
  //   // offlineAccess: true,
  //   // forceCodeForRefreshToken: true,
  //   // webClientId:
  //   //   '457067784334-1rkf99ps1piuc8v04umvgv5uttems70d.apps.googleusercontent.com', // Replace with your web client ID
  // });

  const signIn = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();
      if (!hasPlayServices) {
        throw new Error('Google Play Services are not available.');
      }

      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        try {
          setShowLoadingModal(true);
          const googleUser: RegisterFormType = {
            userName: userInfo.user.givenName + ' ' + userInfo.user.familyName,
            email: userInfo.user.email,
            password: userInfo.user.id,
            confirmPassword: '',
          };
          const isUserRegistered = await checkIfUserExists(googleUser);

          if (isUserRegistered.response) {
            const loginData: LoginFormType = {
              email: userInfo.user.email,
              password: userInfo.user.id,
            };
            await onSubmit(loginData);
          } else {
            await GoogleSignin.signOut();
            const result = await userRegister(googleUser);
            const token = result.response.accessToken;

            if (token) {
              setUserToken(token);
              AsyncStorage.setItem('userToken', token as string);
            }
          }
        } catch (err: any) {
          console.log('rr>>', err);
          customHandleError(err);
        } finally {
          setShowLoadingModal(false);
        }
      }

      // Send userInfo.accessToken to your backend for verification
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google play services not available');
      } else {
        console.log(
          'Error occurred while signing in with Google:',
          error.message,
        );
      }
    } finally {
      setShowLoadingModal(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async loginData => {
    console.log(loginData);
    try {
      setShowLoadingModal(true);
      const result = await userLogin(loginData);
      // console.log('hello');
      // console.log('result', result);
      // const token = result.data.accessToken;
      const token = result.response.accessToken;
      // console.log('token>>>>>', token);
      if (token) {
        setUserToken(token);
        AsyncStorage.setItem('userToken', token as string);
      }
    } catch (err: any) {
      console.log('rr>>', err);
      customHandleError(err);
    } finally {
      setShowLoadingModal(false);
    }
  };

  return (
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
            Login
          </Text>

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
            <Text style={styles.validationMessage}>{errors.email.message}</Text>
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
        </View>

        <CustomButton label={'Login'} onPress={handleSubmit(onSubmit)} />

        <View>
          <Text
            style={{textAlign: 'center', color: '#eab308', marginBottom: 30}}>
            Or, <Text style={{color: '#fff'}}>login with ...</Text>
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                signIn();
              }}
              style={{
                borderColor: '#3A3B3C',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 100,
                paddingVertical: 10,
              }}>
              <Image
                source={require('../assets/google.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#3A3B3C',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <Image
                source={require('../assets/facebook.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: '#3A3B3C',
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <Image
                source={require('../assets/twitter.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text style={{color: '#fff'}}>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#eab308', fontWeight: '700'}}>
                {' '}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal visible={showLoadingModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#eab308" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
