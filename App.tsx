import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/context/AuthContext';
import {ErrorHandlerPorvider} from './src/context/ErrorHandlerContext';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <ErrorHandlerPorvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </ErrorHandlerPorvider>
  );
};

export default App;
