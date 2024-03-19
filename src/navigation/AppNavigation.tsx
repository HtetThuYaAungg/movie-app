import {View, Text} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen, {MovieProps} from '../screens/HomeScreen';
import MovieScreen, {CastProps} from '../screens/MovieScreen';
import PersonScreen, {PersonProps} from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

export type RootStackParamList = {
  Home: undefined;
  Movie: {
    item: MovieProps;
  };
  Person: {
    person: CastProps;
  };
  Search: undefined;
};

export type NavigationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Movie"
          component={MovieScreen}
          options={{
            title: 'Movie',
          }}
        />
        <Stack.Screen
          name="Person"
          component={PersonScreen}
          options={{
            title: 'Person',
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
