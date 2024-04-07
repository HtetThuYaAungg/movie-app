import {
  Dimensions,
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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';

import {customStyles, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import {ApiResponse, MovieProps} from './HomeScreen';
import {
  fallbackMoviePoster,
  fetchCreditMovieDetails,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../api/moviedb';
import Loading from '../components/Loading';
import {
  MainStackParamList,
  NavigationMainStackScreenProps,
} from '../navigation/StackNavigator';

const ios = Platform.OS === 'ios';
const topMargin = ios ? 0 : 42;

type ParamsProps = {
  key: string;
  name: string;
  path?: string | undefined;
  params: MovieProps;
};

type Props = {
  navigation: NavigationMainStackScreenProps['navigation'];
  route: RouteProp<MainStackParamList, 'Movie'>;
};

export interface GenresApiInfo {
  id: number;
  name: string;
}

export interface ProductionCompanyInfo {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountriesInfo {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguagesInfo {
  english_name: 'English';
  iso_639_1: 'en';
  name: 'English';
}

export interface DetailApiResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<GenresApiInfo>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompanyInfo>;
  production_countries: Array<ProductionCountriesInfo>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguagesInfo>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type CastProps = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: 3;
  character: string;
  credit_id: string;
  order: 0;
};

export type CreditProps = {
  id: number;
  cast: CastProps[];
  crew: CastProps[];
};

const MovieScreen = ({navigation, route}: Props) => {
  var {width, height} = useWindowDimensions();
  const [isFav, toggleFav] = useState<boolean>(false);
  const [cast, setCast] = useState<CastProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [similarMovies, setSimilarMovies] = useState<MovieProps[]>([]);
  const [movie, setMoivie] = useState<DetailApiResponse>();

  const Id = route.params.item.id;

  useEffect(() => {
    getMovieDetails(Id);
    getMovieCredits(Id);
    getSimilarMovies(Id);
  }, [route.params.item]);

  const getMovieDetails = async (Id: number | string) => {
    // setIsLoading(true);
    const data: DetailApiResponse = await fetchMovieDetails(Id);
    setIsLoading(false);
    setMoivie(data);
    console.log('data', data);
  };

  const getMovieCredits = async (Id: number | string) => {
    // setIsLoading(true);
    const data: CreditProps = await fetchCreditMovieDetails(Id);

    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (Id: number | string) => {
    const data: ApiResponse<MovieProps> = await fetchSimilarMovies(Id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  const movieName = 'Ant-Man and the Wasp: Quantumania';

  console.log('item', route.params.item);

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      {isLoading ? (
        <View>
          <Loading />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          style={styles.mainContainer}>
          <SafeAreaView style={[styles.safeAreaView, {marginTop: topMargin}]}>
            <TouchableOpacity
              style={[styles.iconBtn, customStyles.backGround]}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFav(!isFav)}>
              <HeartIcon size={35} color={isFav ? theme.backGround : 'white'} />
            </TouchableOpacity>
          </SafeAreaView>
          <View>
            <Image
              source={{
                uri:
                  image500(movie?.poster_path as string) || fallbackMoviePoster,
              }}
              style={{
                width,
                height: height * 0.55,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(26, 32, 44, 0.7)',
                'rgba(26, 32, 44, 0.8)',
                'rgba(26, 32, 44, 0.9)',
                'rgba(26, 32, 44, 1)',
              ]}
              style={{
                width,
                height: height * 0.4,
                position: 'absolute',
                bottom: 0,
              }}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>

          <View
            style={{marginTop: -(height * 0.09), paddingVertical: 8, gap: 6}}>
            <Text style={styles.movieName}>{movie?.title}</Text>
            <Text style={styles.release}>
              {`${movie?.status} * ${movie?.release_date?.split('-')[0]} * ${
                movie?.runtime
              } min`}{' '}
            </Text>
            <View style={styles.genres}>
              {movie?.genres.map((genre: GenresApiInfo, index: number) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text key={index} style={styles.action}>
                    {genre?.name} {showDot ? '- ' : null}
                  </Text>
                );
              })}
              {/* <Text style={styles.action}>Action .</Text>
          <Text style={styles.action}> Thrill .</Text>
          <Text style={styles.action}> Comedy .</Text> */}
            </View>
            <Text style={styles.description}>{movie?.overview}</Text>
          </View>
          {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
          {similarMovies.length > 0 && (
            <MovieList
              data={similarMovies}
              title="Similar Movies"
              hideSeeAll={true}
              navigation={navigation}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  safeAreaView: {
    position: 'absolute',
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
  movieName: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  release: {
    color: '#A3A3A3',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 4,
  },
  action: {
    color: '#A3A3A3',
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  description: {
    color: '#A3A3A3',
    marginHorizontal: 16,
    textAlign: 'justify',
    marginTop: 10,
  },
});
