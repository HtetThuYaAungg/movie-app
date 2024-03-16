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

type Props = {
  title: string;
  data: any;
  hideSeeAll?: boolean;
};

const MovieList = ({title, data, hideSeeAll}: Props) => {
  var {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const movieName = 'Spider Man 4 LOlOLLOL';

  const imgPath: ImageSourcePropType = require('../assets/chip.png');

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
        }}>
        {data.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push('Movie', item)}>
            <View style={styles.imageContainer}>
              <Image
                source={imgPath}
                style={[
                  styles.image,
                  {
                    width: width - width * 0.66,
                    height: height - height * 0.75,
                  },
                ]}
              />

              <Text style={styles.movieName}>
                {movieName.length > 14
                  ? movieName.slice(0, 14) + '...'
                  : movieName}
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
    borderRadius: remToPx(1.875),
  },
  movieName: {
    color: 'white',
    marginLeft: 4,
    paddingVertical: 4,
  },
});
