import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  Bars3CenterLeftIcon,
  ChevronLeftIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';
import {customStyles} from '../theme';
import Loading from '../components/Loading';

import {RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationDrawerScreenProps} from '../navigation/DrawerNavigator';

type Props = {
  navigation: NavigationDrawerScreenProps['navigation'] & {
    openDrawer?: () => void;
  };
};

const ProfileScreen = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ios = Platform.OS === 'ios';

  const marginVertical = ios ? 0 : 42;

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      {isLoading ? (
        <View style={{top: -50}}>
          <Loading />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={[styles.safeAreaView, {marginTop: marginVertical}]}>
            <View style={styles.topView}>
              <Bars3CenterLeftIcon
                size={30}
                strokeWidth={4}
                color="white"
                onPress={navigation.openDrawer}
              />
            </View>
          </SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Obcaecati soluta accusantium ipsam repellendus culpa assumenda
              quis id sed ad commodi ipsum tempora, fugiat, dolorem nisi
              doloribus esse eveniet! Totam sit cumque sunt suscipit nobis,
              illum sapiente adipisci inventore esse iste ex odio eaque ullam ad
              eum. Recusandae, placeat a reprehenderit molestiae sed dolores
              enim nam, voluptatum voluptate asperiores tempora quo provident
              odio in eveniet. Neque, quaerat aut. Facilis ab excepturi iste sit
              animi itaque enim officiis autem laborum illo molestiae
              repudiandae commodi velit soluta est nostrum voluptatem dolor
              cupiditate iusto, ea blanditiis molestias? Illo hic tenetur natus
              perspiciatis, omnis ab doloribus, ducimus officia odit cupiditate
              porro, tempora quas ut vitae minima eum magnam sed! Perferendis
              eos mollitia et cumque quo quas blanditiis itaque eius rem,
              provident molestias dolor aperiam amet distinctio tempore nihil
              cum excepturi suscipit quidem ut est repudiandae pariatur
              consequatur. Soluta, minus autem officia quam consequatur
              laudantium consectetur quae commodi quis. Sit ipsa neque rem
              veniam? Dolores doloribus modi odio, laboriosam nisi laborum.
              Nostrum laboriosam, repellat provident natus veniam, eligendi
              excepturi eos nihil aperiam quam aliquam rem. Velit harum ducimus
              labore minus? Eos sapiente quis culpa? Quos maxime debitis
              corporis quas praesentium facilis pariatur ullam veniam atque
              quidem, tempora nisi blanditiis ratione deleniti minima delectus
              totam obcaecati. Voluptatum odit assumenda dolorum perspiciatis
              repudiandae dolorem harum culpa quaerat doloribus quasi, placeat
              tempora laborum pariatur veniam exercitationem aliquid
              voluptatibus! Id beatae illo recusandae libero expedita unde
              minima asperiores, nihil adipisci, at explicabo! Dolores culpa
              voluptatem a magnam repellendus! Corrupti magni asperiores sunt
              magnam rem earum animi dolorem blanditiis quasi? Deserunt quisquam
              mollitia eaque nesciunt porro amet, unde est dolorem laborum
              praesentium tempore quos dolorum at explicabo harum, quam
              similique tempora vitae alias iusto assumenda ea vero numquam.
              Quasi, ratione enim? Nisi totam architecto vitae, dicta sequi
              dolorum iure pariatur animi doloribus dolore! Quae, ipsa ex itaque
              earum atque modi doloribus, consectetur saepe aliquam corporis
              soluta nemo magni impedit, ad est commodi? Dolores laudantium
              impedit tempora commodi! Rerum temporibus velit et expedita, id
              praesentium explicabo quisquam commodi sint esse consequatur nemo
              accusamus excepturi ducimus facere reprehenderit sunt officia
              aliquid ipsam! Laborum omnis numquam ullam perspiciatis nobis
              corporis, provident veniam temporibus! Eum, non dicta quisquam
              iure quia suscipit culpa recusandae possimus labore amet fuga qui,
              blanditiis officiis eos sunt necessitatibus veniam consequatur
              soluta hic ad. Magnam fuga doloremque eum inventore accusamus
              dolores facere quisquam nam aliquam quos molestias quidem, quia
              suscipit ab, dolore sed velit tenetur cum enim, ullam cumque harum
              nesciunt? Eius temporibus vero alias beatae deserunt eveniet
              ratione aliquid odio ea suscipit! Quaerat repellendus nihil labore
              ipsum mollitia veniam nostrum ad ut quo necessitatibus.
              Praesentium excepturi vero laudantium repudiandae eveniet dolorem
              repellendus atque non earum modi, accusamus ratione consequuntur
              nostrum rerum omnis rem quaerat animi. Velit illum repellat rem
              dolores aut labore expedita ipsam eligendi dolorem eveniet, optio
              sit consequuntur recusandae atque voluptatibus eos? Nostrum earum,
              illo totam eum ea rerum ratione odit impedit soluta. Adipisci
              facilis doloremque sunt fuga, nihil, placeat voluptates vero
              assumenda soluta aliquid voluptas ea pariatur.
            </Text>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

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
  scrollView: {
    flex: 1,
    marginHorizontal: 15,
  },
  text: {
    textAlign: 'justify',
  },
});
