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
import {useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';

import {customStyles, theme} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';

const ios = Platform.OS === 'ios';
const topMargin = ios ? 0 : 42;

const MovieScreen = () => {
  const {params: item} = useRoute();
  var {width, height} = useWindowDimensions();
  const [isFav, toggleFav] = useState<boolean>(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  useEffect(() => {}, [item]);

  const movieName = 'Ant-Man and the Wasp: Quantumania';

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={styles.mainContainer}>
      <View>
        <StatusBar translucent backgroundColor="transparent" />

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
            source={require('../assets/test2.jpg')}
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
      </View>
      <View style={{marginTop: -(height * 0.09), paddingVertical: 8, gap: 6}}>
        <Text style={styles.movieName}>{movieName}</Text>
        <Text style={styles.release}> Released . 2024 . 150 min</Text>
        <View style={styles.genres}>
          <Text style={styles.action}>Action .</Text>
          <Text style={styles.action}> Thrill .</Text>
          <Text style={styles.action}> Comedy .</Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          iste deleniti illo doloribus magni architecto quod fuga nobis hic.
          Fugiat recusandae praesentium porro voluptates quo doloribus molestias
          assumenda, maiores a? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptates iste deleniti illo doloribus magni
          architecto quod fuga nobis hic. Fugiat recusandae praesentium porro
          voluptates quo doloribus molestias assumenda, maiores a?
        </Text>
      </View>
      <Cast cast={cast} navigaion={navigation} />
      <MovieList
        data={similarMovies}
        title="Similar Movies"
        hideSeeAll={true}
      />
    </ScrollView>
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
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 4,
  },
  action: {
    color: '#A3A3A3',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  description: {
    color: '#A3A3A3',
    marginHorizontal: 16,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
