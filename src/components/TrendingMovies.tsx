import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {remToPx} from '../utils/common';
import {CustomButton} from './common_utils';
import Item from './Item';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {Data} from '../constants/data';

export const TrendingMovies = ({data}: any) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const ITEM_WIDTH = width - width * 0.4;
  const ITEM_HEIGHT = height - height * 0.65;
  const MARGIN_HORIZONTAL = 20;
  const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
  const SPACER = (width - ITEM_FULL_WIDTH) / 2;

  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const handleClick = (item: Data) => {
    navigation.navigate('Movie', item);
  };

  return (
    <View style={[styles.mainContainer, {height: height - height * 0.58}]}>
      <Text style={styles.text}>Trending</Text>
      <Animated.FlatList
        onScroll={onScroll}
        data={data}
        keyExtractor={(item: Data) => `${item.id}${item.name}`}
        renderItem={({item, index}) => {
          return (
            <Item
              item={item}
              index={index}
              height={ITEM_HEIGHT}
              width={ITEM_WIDTH}
              marginHorizontal={MARGIN_HORIZONTAL}
              x={x}
              fullWidth={ITEM_FULL_WIDTH}
              handleClick={handleClick}
            />
          );
        }}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{width: SPACER}}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{width: SPACER}}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={'fast'}
        snapToInterval={ITEM_FULL_WIDTH}
        style={styles.flatListStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  text: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: remToPx(1),
    fontWeight: 'bold',
  },

  flatListStyle: {
    paddingTop: 10,
    alignSelf: 'center',
  },
});

export default TrendingMovies;
