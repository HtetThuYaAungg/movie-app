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
import {CastProps} from '../screens/MovieScreen';
import {fallbackPersonImage, image185} from '../api/moviedb';
import {NavigationMainStackScreenProps} from '../navigation/StackNavigator';

type Props = {
  cast: CastProps[];
  navigation: NavigationMainStackScreenProps['navigation'];
};

const Cast = ({cast, navigation}: Props) => {
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
                onPress={() => navigation.navigate('Person', {person})}>
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
                    // source={require('../assets/test2.jpg')}
                    source={{
                      uri:
                        image185(person.profile_path as string) ||
                        fallbackPersonImage,
                    }}
                    style={{borderRadius: 60, height: 60, width: 60}}
                  />
                </View>

                <Text style={styles.characterName}>
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person.character}
                </Text>
                <Text style={styles.personName}>
                  {person.name.length > 10
                    ? person.name.slice(0, 10) + '...'
                    : person.name}
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
