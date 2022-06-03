import React, {useState, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Logo from '../../assets/images/gktLogo.jpg';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityDetail = props => {
  const [followingState, setFollowingState] = useState(
    props.route.params?.followingState ?? false,
  );
  const [user, setUser] = useState({});

  const followCommunity = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        return props.navigation.navigate('Sign In');
      if ((await AsyncStorage.getItem('role')) !== 'Student')
        console.error('Only students can follow');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const followResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/AddfollowedCommunity',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            communityId: props.route.params.id,
            studentId: userId,
          }),
        },
      );

      const followJson = await followResponse.json();
      if (!followJson.succeeded) throw new Error(followJson.message);
      setFollowingState(true);
    } catch (ex) {
      console.log(ex);
    }
  };

  const unfollowCommunity = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        console.error('Not logged in');
      if ((await AsyncStorage.getItem('role')) !== 'Student')
        console.error('Only students can unfollow');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const unfollowResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/RemoveFollowedCommunity',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            communityId: props.route.params.id,
            studentId: userId,
          }),
        },
      );

      const unfollowJson = await unfollowResponse.json();
      setFollowingState(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');

    setUser({token, role});
    setFollowingState(props.route.params?.followingState ?? false);
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const generateContent = () => {
    if (user.role !== 'Community') {
      return (
        <View>
          {followingState ? (
            <TouchableOpacity
              style={styles.card_button}
              onPress={unfollowCommunity}>
              <Text style={styles.buttonText}>{'Takipten Çık'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.card_button}
              onPress={followCommunity}>
              <Text style={styles.buttonText}>{'Topluluğu Takip Et'}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else return <View></View>;
  };

  return (
    <View style={styles.card_container}>
      <ImageBackground
        style={styles.image}
        source={
          props.route.params.backgroundImage
            ? {
                uri: `https://bildir.azurewebsites.net/${props.route.params.backgroundImage.path}`,
              }
            : {
                uri: 'https://www.china-admissions.com/wp-content/uploads/2021/06/Divi-Community-Update-May-2020-scaled-1.jpeg',
              }
        }></ImageBackground>

      <View style={styles.card_body}>
        <View style={styles.card_header}>
          <Text style={styles.card_title}>{props.route.params.name}</Text>
          {/* <Image style={styles.communityLogo} source={Logo}></Image> */}
        </View>

        {props.route.params.followers && (
          <View>
            <Text
              style={
                styles.tags
              }>{`Takipçi Sayısı: ${props.route.params.followers.length}`}</Text>
            <Text
              style={
                styles.tags
              }>{`Etkinlik Sayısı: ${props.route.params.organizedEvents.length}`}</Text>
          </View>
        )}

        <Text>E-posta: {props.route.params.email}</Text>
        <Text>{props.route.params.description}</Text>

        {generateContent()}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card_container: {
    margin: 10,
    flex: 1,
  },
  card_header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  card_title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 3,
  },
  tags: {
    color: 'blue',
    marginBottom: 10,
  },
  communityLogo: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  image: {
    height: Dimensions.get('window').height / 4,
  },
  card_button: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#1266F1',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  card_body: {
    padding: 15,
  },
});

export default CommunityDetail;
