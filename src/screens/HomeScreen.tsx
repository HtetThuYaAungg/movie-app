import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {remToPx} from '../utils/common';
import {customStyles} from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import {data} from '../constants/data';
import MovieList from '../components/MovieList';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  NavigationScreenProps,
  RootStackParamList,
} from '../navigation/AppNavigation';

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ApiResponse<T> = {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
};

type Props = {
  navigation: NavigationScreenProps['navigation'];
};

const HomeScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trendingMovies, setTrendingMovies] = useState<MovieProps[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieProps[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data: ApiResponse<MovieProps> = await fetchTrendingMovies();
    if (data && data.results) {
      setTrendingMovies(data.results);
    }
    setIsLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data: ApiResponse<MovieProps> = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcomingMovies(data.results);
    }
  };

  const getTopRatedMovies = async () => {
    const data: ApiResponse<MovieProps> = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRatedMovies(data.results);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#242526" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.topView}>
          <Bars3CenterLeftIcon size={30} strokeWidth={4} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: remToPx(1.875),
              fontWeight: 'bold',
            }}>
            <Text style={customStyles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={4} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View style={{top: -50}}>
          <Loading />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          {trendingMovies.length > 0 && (
            <TrendingMovies data={trendingMovies} navigation={navigation} />
          )}
          <MovieList
            title="Upcoming"
            data={upcomingMovies}
            navigation={navigation}
          />
          <MovieList
            title="Top Rated"
            data={topRatedMovies}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </View>
  );
};

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
  text: {},
});

export default HomeScreen;
