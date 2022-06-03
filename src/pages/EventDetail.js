import React, {useState, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';

const EventDetail = props => {
  const [participationState, setParticipationState] = useState(
    props.route.params?.participationState ?? '',
  );
  const [user, setUser] = useState({});

  const registerToEvent = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        return props.navigation.navigate('Sign In');
      if ((await AsyncStorage.getItem('role')) !== 'Student')
        console.error('Only students can join');

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

      const registerResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/RegisterToEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: props.route.params.id,
            studentId: userId,
          }),
        },
      );

      const registerJson = await registerResponse.json();
      if (!registerJson.succeeded) throw new Error(registerJson.message);
      setParticipationState('Participating');
    } catch (ex) {
      console.log(ex);
    }
  };
  const leaveButtonHandler = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        console.error('Not logged in');
      if ((await AsyncStorage.getItem('role')) !== 'Student')
        console.error('Only students can abandon');

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

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/AbandonEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: props.route.params.id,
            studentId: userId,
          }),
        },
      );

      const abandonJson = await abandonResponse.json();
      setParticipationState('Abandoned');
    } catch (ex) {
      console.log(ex);
    }
  };

  const endEventHandler = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        console.error('Not logged in');
      if ((await AsyncStorage.getItem('role')) !== 'Community')
        console.error('Only communities can end event');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event/EndEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: props.route.params.id,
            communityId: userId,
          }),
        },
      );

      const abandonJson = await abandonResponse.json();
      props.navigation.goBack();
    } catch (ex) {
      console.log(ex);
    }
  };

  const cancelEventHandler = async () => {
    try {
      if (!(await AsyncStorage.getItem('token')))
        console.error('Not logged in');
      if ((await AsyncStorage.getItem('role')) !== 'Community')
        console.error('Only communities can cancel event');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event/CancelEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: props.route.params.id,
            communityId: userId,
          }),
        },
      );

      const abandonJson = await abandonResponse.json();
      props.navigation.goBack();
    } catch (ex) {
      console.log(ex);
    }
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');

    setUser({token, role});
    setParticipationState(props.route.params?.participationState ?? '');
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const generateContent = () => {
    if (user.role === 'Community') {
      if (props.route.params.isEditable) {
        if (props.route.params.state === 'Active')
          return (
            <View>
              <TouchableOpacity
                style={styles.card_button}
                onPress={endEventHandler}>
                <Text style={styles.buttonText}>{'Etkinliği Bitir'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card_button}
                onPress={cancelEventHandler}>
                <Text style={styles.buttonText}>{'Etkinliği İptal Et'}</Text>
              </TouchableOpacity>
            </View>
          );
      } else return <View></View>;
    }

    return participationState !== 'Participating' ? (
      <TouchableOpacity style={styles.card_button} onPress={registerToEvent}>
        <Text style={styles.buttonText}>{'Etkinliğe Katıl'}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.card_button} onPress={leaveButtonHandler}>
        <Text style={styles.buttonText}>{'Ayrıl'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.card_container}>
        <ImageBackground
          style={styles.image}
          source={
            props.route.params.images.length >= 1
              ? {
                  uri: `https://bildir.azurewebsites.net/${props.route.params.images[0].path}`,
                }
              : {
                  uri: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg',
                }
          }></ImageBackground>
        <View style={styles.card_body}>
          <View style={styles.card_header}>
            <Text style={styles.card_title}>{props.route.params?.title}</Text>
            <Text style={styles.community}>
              {props.route.params?.eventOf?.name}
            </Text>
          </View>

          <View style={styles.card_timeLocation}>
            <Text>{props.route.params?.location}</Text>
            <Text>{props.route.params?.date}</Text>
          </View>
          <Text style={styles.tags}>{props.route.params?.tags}</Text>
          <Text>{props.route.params.description}</Text>

          {generateContent()}
        </View>
        <SliderBox
          style={styles.images}
          images={props.route.params.images.map(
            i => `https://bildir.azurewebsites.net/${i.path}`,
          )}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card_container: {
    margin: 10,
    height: '100%',
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
  community: {
    flex: 1,
    color: 'black',
  },
  image: {
    height: Dimensions.get('window').height / 4,
  },
  images: {
    width: Dimensions.get('window').width * 0.95,
    height: 200,
  },
  card_timeLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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

export default EventDetail;
