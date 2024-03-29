import {View, Text, StyleSheet} from 'react-native';
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
import StackNavigator from './StackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {customStyles} from '../theme';
import Sidebar from '../components/Sidebar';

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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
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

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      initialRouteName="Main"
      screenOptions={{
        // drawerContentStyle: {
        //   backgroundColor: 'red',
        //   borderBottomEndRadius: 20,
        // },
        // drawerContentStyle: {
        //   backgroundColor: 'green',
        //   borderBottomRightRadius: 20,
        //   borderTopRightRadius: 20,
        // },
        // drawerContentContainerStyle: {
        //   backgroundColor: 'blue',
        //   borderTopEndRadius: 20,
        // },
        drawerStyle: {
          backgroundColor: '#1a202c',
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
          // flex: 1,
        },
        drawerLabelStyle: {
          color: '#eab308',
        },
        drawerActiveBackgroundColor: '#3A3B3C',
      }}>
      <Drawer.Screen
        name="Home Page"
        component={MainStackNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
