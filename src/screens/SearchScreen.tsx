import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {XCircleIcon} from 'react-native-heroicons/solid';
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchSearchMovies,
  image185,
  image342,
} from '../api/moviedb';
import {ApiResponse, MovieProps} from './HomeScreen';
import {NavigationMainStackScreenProps} from '../navigation/StackNavigator';
// import {debounce} from 'lodash';

type Props = {
  navigation: NavigationMainStackScreenProps['navigation'];
};

const SearchScreen = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();

  const [results, setResults] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const movieName = 'Lorem ipsum dolor sit amet consectetur';

  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number,
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setIsLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: false,
        language: 'en_Us',
        page: '1',
      }).then((data: ApiResponse<MovieProps>) => {
        setIsLoading(false);
        console.log('search', data);
        setResults(data.results);
      });
    } else {
      setIsLoading(false);
      setResults([]);
    }
    // Add your search logic here
  };

  const handleDebounce = useCallback(
    debounce((text: string) => {
      handleSearch(text);
    }, 500),
    [],
  );
  // const handler = useCallback(debounce(handleSearch, 2000), []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#242526" />
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={text => handleDebounce(text)}
          style={styles.textInput}
          placeholder="Search Movie"
          placeholderTextColor={'#A3A3A3'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.clearBtn}>
          <XCircleIcon size="30" color="white" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{top: -50}}>
          <Loading />
        </View>
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          style={{paddingVertical: 12}}>
          <Text style={styles.result}>Result ({results.length})</Text>

          <View style={styles.resultContainer}>
            {results.map((item, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('Movie', {item})}>
                  <View style={{paddingVertical: 8, marginVertical: 4}}>
                    <Image
                      source={{
                        uri: image342(item.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.33,
                        borderRadius: 24,
                      }}
                    />
                    <Text
                      style={{
                        color: '#A3A3A3',
                        marginLeft: 4,
                        textAlign: 'center',
                      }}>
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + '...'
                        : item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Image
            source={require('../assets/pngwing.com.png')}
            style={{width: width * 0.6, height: height * 0.6, opacity: 0.35}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#242526',
    flex: 1,
    paddingTop: 41,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#A3A3A3',
    borderWidth: 1,
    borderRadius: 26,
    elevation: 0.1,
  },
  textInput: {
    fontSize: 18,
    fontWeight: 'normal',
    flex: 1,
    color: 'white',
    letterSpacing: 2,
    paddingLeft: 24,
  },
  clearBtn: {
    borderRadius: 100,
    padding: 8,
    margin: 2,
    backgroundColor: '#A3A3A3',
  },
  result: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 4,
  },
  resultContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
});
function debounce(handleSearch: (value: string) => void, arg1: number) {
  throw new Error('Function not implemented.');
}
