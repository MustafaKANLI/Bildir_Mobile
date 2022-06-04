import {View, ScrollView} from 'react-native';
import React, {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunityItem from '../../components/CommunityItem/CommunityItem';
import {useFocusEffect} from '@react-navigation/native';

const FollowedCommunities = props => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const userJson = await userResponse.json();

      setUser({userJson});
    } catch (err) {
      console.error(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {user.userJson?.data.followedCommunities.map((community, index) => {
          community.followingState = true;
          return (
            <CommunityItem
              key={index}
              detail={props.navigation}
              data={community}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FollowedCommunities;
