import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  cast: any[];
  navigaion: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>;
};

const Cast = ({cast, navigaion}: Props) => {
  let personName = 'Keanu Reevs';
  let characterName = 'John Wick';

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.topCast}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.person}
                onPress={() => navigaion.navigate('Person', person)}>
                <View
                  style={{
                    overflow: 'hidden',
                    borderRadius: 60,
                    height: 60,
                    width: 60,
                    alignItems: 'center',
                    borderColor: '#A3A3A3',
                    borderWidth: 1,
                  }}>
                  <Image
                    source={require('../assets/test2.jpg')}
                    style={{borderRadius: 60, height: 60, width: 60}}
                  />
                </View>

                <Text style={styles.characterName}>
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + '...'
                    : characterName}
                </Text>
                <Text style={styles.personName}>
                  {personName.length > 10
                    ? personName.slice(0, 10) + '...'
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 24,
  },
  topCast: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  person: {
    marginRight: 16,
    alignItems: 'center',
  },
  characterName: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  personName: {
    color: '#A3A3A3',
    fontSize: 12,
    marginTop: 4,
  },
});
