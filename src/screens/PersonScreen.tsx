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
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {customStyles, theme} from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
// import {
//   NavigationScreenProps,
//   RootStackParamList,
// } from '../navigation/AppNavigation';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from '../api/moviedb';
import {ApiResponse, MovieProps} from './HomeScreen';
import {
  MainStackParamList,
  NavigationMainStackScreenProps,
} from '../navigation/StackNavigator';

type Props = {
  navigation: NavigationMainStackScreenProps['navigation'];
  route: RouteProp<MainStackParamList, 'Person'>;
};

export type PersonProps = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

const PersonScreen = ({navigation, route}: Props) => {
  const {width, height} = useWindowDimensions();

  const ios = Platform.OS === 'ios';

  const marginVertical = ios ? 0 : 42;

  const Id = route.params.person.id;

  const [isFav, toggleFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<PersonProps>();
  const [personMovie, setPersonMovie] = useState<MovieProps[]>([]);

  useEffect(() => {
    getPersonDetails(Id);
    getPersonMovies(Id);
  }, [route.params.person]);

  const getPersonDetails = async (id: number | string) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setIsLoading(false);
  };

  const getPersonMovies = async (id: number | string) => {
    const data: any = await fetchPersonMovies(id);
    console.log('helloej>>', data);
    if (data && data?.cast) {
      setPersonMovie(data.cast);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      {isLoading ? (
        <View style={{top: -50}}>
          <Loading />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <SafeAreaView
            style={[styles.safeAreaView, {marginTop: marginVertical}]}>
            <TouchableOpacity
              style={[styles.iconBtn, customStyles.backGround]}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            {!isLoading && (
              <TouchableOpacity onPress={() => toggleFav(!isFav)}>
                <HeartIcon size={35} color={isFav ? 'red' : 'white'} />
              </TouchableOpacity>
            )}
          </SafeAreaView>
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
                  uri:
                    image500(person?.profile_path as string) ||
                    fallbackPersonImage,
                }}
                style={{height: height * 0.4, width: height * 0.4}}
              />
            </View>
          </View>
          <View style={styles.personDetails}>
            <Text style={styles.name}>{person?.name}</Text>
            <Text style={styles.address}>{person?.place_of_birth}</Text>
          </View>
          <View
            style={[
              styles.bio,
              {width: width > 500 ? width * 0.7 : width * 0.87},
            ]}>
            <View style={styles.bioItem}>
              <Text style={styles.bioTextOne}>Gender</Text>
              <Text style={styles.bioTextTwo}>
                {person?.gender == 1 ? 'FeMale' : 'Male'}
              </Text>
            </View>
            <View
              style={[
                styles.bioItem,
                {borderRightWidth: 2, borderLeftWidth: 2},
              ]}>
              <Text style={styles.bioTextOne}>Birthday</Text>
              <Text style={styles.bioTextTwo}>{person?.birthday}</Text>
            </View>
            <View style={[styles.bioItem, {borderRightWidth: 2}]}>
              <Text style={styles.bioTextOne}>Known for</Text>
              <Text style={styles.bioTextTwo}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={styles.bioItem}>
              <Text style={styles.bioTextOne}>Popularity</Text>
              <Text style={styles.bioTextTwo}>
                {person?.popularity.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View style={styles.biography}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyDesc}>
              {person?.biography || 'N/A'}
            </Text>
          </View>
          <MovieList
            title="Movies"
            hideSeeAll={true}
            data={personMovie}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3A3B3C',
  },
  safeAreaView: {
    zIndex: 10,
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
  bio: {
    marginHorizontal: 12,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
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
