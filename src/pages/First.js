import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card/Card';
import Input from '../components/Input/';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const First = props => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');

    setUser({token, role});
  };

  const getData = async () => {
    await getUser();
    await getEvents();
  };

  const getEvents = async () => {
    try {
      let participations = null;
      let followedCommunities = null;
      if ((await AsyncStorage.getItem('role')) === 'Student') {
        const userResponse = await fetch(
          'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            },
          },
        );
        const userJson = await userResponse.json();
        participations = userJson?.data?.participatedEvents;
        followedCommunities = userJson?.data?.followedCommunities;
      }

      const response = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event',
      );

      const data = await response.json();
      let mappedEvents = data.data;

      if (participations)
        mappedEvents = data.data
          .map(e => {
            let foundEvent = participations.find(p => p.id === e.id);
            if (foundEvent)
              e.participationState = foundEvent.participationState;
            return e;
          })
          .map(e => {
            let foundCommunity = followedCommunities.find(
              c => c.id === e.eventOf.id,
            );
            if (foundCommunity) e.eventOfFollowedCommunity = true;
            else e.eventOfFollowedCommunity = false;
            return e;
          })
          .sort((e1, e2) => {
            if (e1.state === 'Active' && e2.state !== 'Active') return -1;
            else if (e1.state !== 'Active' && e2.state === 'Active') return 1;
            else if (e1.state === 'Active' && e2.state === 'Active') {
              if (e1.eventOfFollowedCommunity && !e2.eventOfFollowedCommunity)
                return -1;
              else if (
                !e1.eventOfFollowedCommunity &&
                e2.eventOfFollowedCommunity
              )
                return 1;
              else return 0;
            }
          });

      setEvents(mappedEvents);
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const onSearchChange = e => {
    setSearch(e);
  };

  //     filter()
  // }
  // const temp = events

  // console.log("sörc", search === "")

  // const filter = async () => {
  //     if (search === "") {
  //         console.log("gir artık")
  //     }
  //     if (search !== "") {
  //         const filteredData =
  //             events.filter((event) => {
  //                 console.log("ews", event.title.toLowerCase().startsWith(search))

  //                 return event.title.toLowerCase().startsWith(search)
  //             })
  //         //await setEvents(filteredData)
  //     }
  //     else {
  //         console.log("sıfırla")
  //         //await setEvents(temp)
  //     }
  // }

  const createEvent = () => {
    props.navigation.navigate('Etkinlik Oluştur');
  };

  return (
    <View style={styles.container}>
      {user.Role === 'Community' && (
        <TouchableOpacity style={styles.createEvent} onPress={createEvent}>
          <Text style={styles.createEventText}>+</Text>
        </TouchableOpacity>
      )}

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Input onChangeText={onSearchChange} label="Etkinlik ara" />
        {events.map((d, index) => {
          return (
            <Card
              key={index}
              detail={props.navigation}
              likeButtonActive={true}
              data={d}
              user={user}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  createEvent: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#E20576',
    borderRadius: 40,
  },
  createEventText: {
    margin: 10,
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default First;
