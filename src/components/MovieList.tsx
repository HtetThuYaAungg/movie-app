import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {remToPx} from '../utils/common';
import {customStyles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreenProps} from '../navigation/AppNavigation';
import {MovieProps} from '../screens/HomeScreen';
import {
  fallbackMoviePoster,
  fallbackPersonImage,
  image185,
} from '../api/moviedb';

type Props = {
  title: string;
  data: MovieProps[];
  hideSeeAll?: boolean;
  navigation: NavigationScreenProps['navigation'];
};

const MovieList = ({title, data, hideSeeAll, navigation}: Props) => {
  var {width, height} = useWindowDimensions();

  const movieName = 'Spider Man 4 LOlOLLOL';

  const imgPath: ImageSourcePropType = require('../assets/test.jpg');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[customStyles.text, styles.seeAll]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginTop: 14,
          gap: 12,
        }}>
        {data.map((item, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Movie', {item})}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={[
                  styles.image,
                  {
                    width: width - width * 0.7,
                    height: height - height * 0.75,
                  },
                ]}
              />

              <Text style={styles.movieName}>
                {item?.title.length > 14
                  ? item.title.slice(0, 14) + '...'
                  : item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 18,
  },
  imageContainer: {
    marginVertical: 12,
    marginRight: 12,
  },
  image: {
    borderRadius: remToPx(1.8),
  },
  movieName: {
    color: 'white',
    marginLeft: 4,
    paddingVertical: 4,
  },
});
