// StackNavigator.tsx
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen, {MovieProps} from '../screens/HomeScreen';
import MovieScreen, {CastProps} from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
// import { RootStackParamList } from './AppNavigation';

export type MainStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Home: undefined;
  Movie: {
    item: MovieProps;
  };
  Person: {
    person: CastProps;
  };
  Search: undefined;
};

export type NavigationMainStackScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList>;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
