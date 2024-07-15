import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {theme} from '../theme';

const Loading = () => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.mainContainer, {width: width, height: height}]}>
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.backGround}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    // position: 'absolute',
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
