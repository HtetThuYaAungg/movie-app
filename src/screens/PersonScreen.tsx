import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {customStyles, theme} from '../theme';
import MovieList from '../components/MovieList';

const PersonScreen = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const ios = Platform.OS === 'ios';

  const marginVertical = ios ? 0 : 42;

  const [isFav, toggleFav] = useState<boolean>(false);
  const [personMovie, setPersonMovie] = useState([1, 2, 3, 4, 5]);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{paddingBottom: 20}}>
      <StatusBar backgroundColor="#3A3B3C" />

      <SafeAreaView
        style={[styles.safeAreaView, {marginVertical: marginVertical}]}>
        <TouchableOpacity
          style={[styles.iconBtn, customStyles.backGround]}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFav(!isFav)}>
          <HeartIcon size={35} color={isFav ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      <View>
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
              source={require('../assets/test2.jpg')}
              style={{height: height * 0.4, width: height * 0.4}}
            />
          </View>
        </View>
        <View style={styles.personDetails}>
          <Text style={styles.name}>Keanu Reevs</Text>
          <Text style={styles.address}>London, United Kingdom</Text>
        </View>
        <View style={styles.bio}>
          <View style={styles.bioItem}>
            <Text style={styles.bioTextOne}>Gender</Text>
            <Text style={styles.bioTextTwo}>Male</Text>
          </View>
          <View
            style={[styles.bioItem, {borderRightWidth: 2, borderLeftWidth: 2}]}>
            <Text style={styles.bioTextOne}>Birthday</Text>
            <Text style={styles.bioTextTwo}>1964-09-02</Text>
          </View>
          <View style={[styles.bioItem, {borderRightWidth: 2}]}>
            <Text style={styles.bioTextOne}>Known for</Text>
            <Text style={styles.bioTextTwo}>Acting</Text>
          </View>
          <View style={styles.bioItem}>
            <Text style={styles.bioTextOne}>Popularity</Text>
            <Text style={styles.bioTextTwo}>64.23</Text>
          </View>
        </View>
        <View style={styles.biography}>
          <Text style={styles.biographyTitle}>Biography</Text>
          <Text style={styles.biographyDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            id expedita dolor illum doloribus reiciendis culpa fugiat, sed
            excepturi quasi odit perferendis accusamus, voluptas repellendus
            repudiandae, nulla dolores iusto facere. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Consequatur id expedita dolor illum
            doloribus reiciendis culpa fugiat, sed excepturi quasi odit
            perferendis accusamus, voluptas repellendus repudiandae, nulla
            dolores iusto facere.
          </Text>
        </View>
        <MovieList title="Movies" hideSeeAll={true} data={personMovie} />
      </View>
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3A3B3C',
  },
  safeAreaView: {
    top: 0,
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconBtn: {
    borderRadius: 20,
    padding: 5,
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
    elevation: 5,
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
  bio: {
    marginHorizontal: 12,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 24,
  },
  bioItem: {
    borderColor: '#A3A3A3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  bioTextOne: {
    color: 'white',
    fontWeight: '400',
  },
  bioTextTwo: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '300',
  },
  biography: {
    marginVertical: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  biographyTitle: {
    color: 'white',
    fontSize: 22,
    marginVertical: 16,
  },
  biographyDesc: {
    color: '#A3A3A3',
    letterSpacing: 2,
    textAlign: 'center',
    marginHorizontal: 14,
  },
});
