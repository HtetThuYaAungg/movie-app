import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';

const Sidebar = (props: DrawerContentComponentProps) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView
        style={{
          backgroundColor: '#3A3B3C',
          width: undefined,
          padding: 16,
          paddingTop: 52,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 25,
          flex: 0,
        }}>
        <View>
          <Image
            source={require('../../assets/test2.jpg')}
            style={styles.profile}
          />
          <Text style={styles.name}>TaylorSwift</Text>
        </View>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View
          style={{
            backgroundColor: '#1a202c',
            flex: 1,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 20,
            paddingTop: 20,
            paddingHorizontal: 5,
          }}>
          <DrawerItemList {...props} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 5,
    backgroundColor: '#3A3B3C',
    // marginTop: 20,
    // borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#eab308',
  },
  name: {
    color: '#eab308',
    opacity: 0.8,
    fontWeight: '800',
    fontSize: 20,
    marginVertical: 8,
  },
});
