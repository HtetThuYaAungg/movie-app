import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
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
const HomeScreen = () => {
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
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={4} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <TrendingMovies data={data} />
        <MovieList title="Upcoming" data={[1, 2, 3, 4, 5]} />
        <MovieList title="Top Rated" data={[1, 2, 3, 4, 5]} />
      </ScrollView>
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
