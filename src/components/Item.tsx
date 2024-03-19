import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Data} from '../constants/data';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {MovieProps} from '../screens/HomeScreen';
import {image500} from './../api/moviedb';

type Props = {
  item: MovieProps;
  index: number;
  width: number;
  height: number;
  marginHorizontal: number;
  x: SharedValue<number>;
  fullWidth: number;
  handleClick: (item: MovieProps) => void;
};

const Item = ({
  item,
  index,
  width,
  height,
  marginHorizontal,
  x,
  fullWidth,
  handleClick,
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    // const rotateZ = interpolate(
    //   x.value,
    //   [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
    //   [20, 0, -20],
    //   Extrapolation.CLAMP,
    // );

    // const translateY = interpolate(
    //   x.value,
    //   [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
    //   [60, 0, 60],
    //   Extrapolation.CLAMP,
    // );

    const customHeight = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [height - 50, height, height - 50],
      Extrapolation.CLAMP,
    );

    const marginTop = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [25, 0, 25],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth],
      [0.3, 1, 0.3], // Change opacity from 0 to 1 and back to 0
      Extrapolation.CLAMP,
    );

    return {
      // transform: [{rotateZ: `${rotateZ}deg`}, {translateY: translateY}],
      opacity: opacity,
      height: customHeight,
      marginVertical: marginTop,
    };
  });

  const test = require('../assets/gradient2.png');

  return (
    <Animated.View
      style={[
        styles.container,
        {width: width, height: height, marginHorizontal: marginHorizontal},
        animatedStyle,
      ]}>
      <TouchableOpacity onPress={() => handleClick(item)}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: image500(item.poster_path as string),
            }}
            style={{width: width, height: height}}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
    transformOrigin: 'bottom',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  imageContainer: {
    flex: 1,
  },
});
