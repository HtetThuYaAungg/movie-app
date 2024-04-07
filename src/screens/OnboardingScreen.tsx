import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
// import {NavigationScreenProps} from '../navigation/AppNavigation';
import {customStyles} from '../theme';
import {NavigationAuthStackScreenProps} from '../navigation/AuthNavigator';

type Props = {
  navigation: NavigationAuthStackScreenProps['navigation'];
};

const OnboardingScreen = ({navigation}: Props) => {
  const {width} = useWindowDimensions();

  return (
    <>
      <StatusBar backgroundColor={'#1a202c'} translucent />
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={[styles.title]}>
            HPLUS'<Text style={customStyles.text}>S</Text> MOVIES
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/film.png')}
            style={{width: width, height: 300}}
          />
        </View>

        <View style={styles.letsLoginContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.letsLogin}>
            <Text style={[customStyles.text, styles.text]}>Let's Begin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1a202c',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 0,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  letsLoginContainer: {
    flex: 1,
    alignItems: 'center',
  },
  letsLogin: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#3A3B3C',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
