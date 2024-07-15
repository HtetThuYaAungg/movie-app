// DrawerNavigator.tsx
import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
// import {RootStackParamList} from './AppNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import StackNavigator from './StackNavigator';
import Sidebar from '../components/Sidebar';

export type DrawerParamList = {
  StackNavigator: undefined;
  ProfileScreen: undefined;
};

export type NavigationDrawerScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      initialRouteName="HomePage"
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
        name="HomePage"
        component={StackNavigator}
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

export default DrawerNavigator;
