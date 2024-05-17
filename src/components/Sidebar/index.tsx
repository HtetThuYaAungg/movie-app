import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {customStyles} from '../../theme';
import {useAuthContext} from '../../context/AuthContext';
import useErrorHandler from '../../hooks/useErrorHandler';
import {getUserProfile} from '../../api_services/userAuthService';

enum Status {
  ACTIVE,
  INACTIVE,
  DELETE,
}

type ProfileType = {
  id: number;
  email: string;
  name: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

const Sidebar = (props: DrawerContentComponentProps) => {
  const {logOut} = useAuthContext();
  const {customHandleError} = useErrorHandler();
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // console.log('ehllo');
        const data = await getUserProfile();
        setProfile(data.user);
        // console.log('data', data);
      } catch (error) {
        console.log('helloerror', error);
        customHandleError(error);
      }
    };
    fetchProfile();
  }, []);

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
          borderBottomLeftRadius: 20,
        }}>
        <View>
          <Image
            source={require('../../assets/test2.jpg')}
            style={styles.profile}
          />
          <Text style={styles.name}>{profile?.name}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View
          style={{
            backgroundColor: '#1a202c',
            flex: 4.5,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            paddingTop: 20,
            paddingHorizontal: 5,
          }}>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            flex: 1.5,
            borderBottomRightRadius: 20,
            backgroundColor: '#1a202c',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#3A3B3C',
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 20,
              justifyContent: 'center',
              gap: 4,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1a202c',
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text style={customStyles.text}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#1a202c',
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={() => logOut()}>
              <Text style={customStyles.text}>LogOut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3A3B3C',
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
