import React, {useState, useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CommunityItem from '../components/CommunityItem/CommunityItem';
import Input from '../components/Input/';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Communities = props => {
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');

    setUser({token, role});
  };

  const getData = async () => {
    await getUser();
    await getCommunities();
  };

  const getCommunities = async () => {
    try {
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
        followedCommunities = userJson?.data?.followedCommunities;
      }

      const response = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community',
      );

      const data = await response.json();
      let mappedCommunities = data.data;

      if (followedCommunities)
        mappedCommunities = data.data
          .map(c => {
            let foundCommunity = followedCommunities.find(p => p.id === c.id);
            if (foundCommunity) c.followingState = true;
            else c.followingState = false;
            return c;
          })
          .sort((e1, e2) => {
            if (e1.followingState && !e2.followingState) return 1;
            if (!e1.followingState && e2.followingState) return -1;
            return 0;
          });

      setCommunities(mappedCommunities);
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Input label="Topluluk Ara" />
        {communities.map((d, index) => {
          return (
            <CommunityItem key={index} detail={props.navigation} data={d} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Communities;
