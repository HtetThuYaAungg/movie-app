import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Bars3CenterLeftIcon,
  ChevronLeftIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';
import {customStyles} from '../theme';
import Loading from '../components/Loading';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationDrawerScreenProps} from '../navigation/DrawerNavigator';
import useErrorHandler from '../hooks/useErrorHandler';
import {getUserProfile} from '../api_services/userAuthService';
import {fallbackPersonImage} from '../api/moviedb';

type Props = {
  navigation: NavigationDrawerScreenProps['navigation'] & {
    openDrawer?: () => void;
  };
};

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

const ProfileScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {customHandleError} = useErrorHandler();
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile();
      setProfile(data.user);
      console.log('userInfo', data.user);
    } catch (error) {
      console.log('Error fetching profile:', error);
      customHandleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const ios = Platform.OS === 'ios';

  const marginVertical = ios ? 0 : 42;

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={[styles.safeAreaView, {marginTop: marginVertical}]}>
        <View style={styles.topView}>
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={4}
            color="white"
            onPress={navigation.openDrawer}
          />
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View style={{top: -42}}>
          <Loading />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.details}>
            <View
              style={[
                styles.imageContainer,
                {
                  height: height * 0.35,
                  width: height * 0.35,
                  borderRadius: height * 1,
                },
              ]}>
              <Image
                // source={require('../assets/test2.jpg')}
                source={{
                  uri: fallbackPersonImage,
                }}
                style={{height: height * 0.4, width: height * 0.4}}
              />
            </View>
          </View>
          <View style={styles.personDetails}>
            <Text style={styles.name}>{profile?.name}</Text>
            <Text style={styles.address}>{profile?.email}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#242526',
  },
  safeAreaView: {
    marginBottom: Platform.OS === 'ios' ? 8 : 12,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 15,
  },
  text: {
    textAlign: 'justify',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowRadius: 40,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
  },
  imageContainer: {
    alignItems: 'center',
    elevation: 1,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#A3A3A3',
  },
  personDetails: {
    marginTop: 28,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    fontSize: 18,
    color: '#A3A3A3',
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
