import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './FollowedCommunities.style'
import Card from '../../components/Card/Card';
import CommunityItem from '../../components/CommunityItem/CommunityItem';

const FollowedCommunities = (props) => {

    const [user, setUser] = useState({})

    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');

        const userResponse = await fetch(
            "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const userJson = await userResponse.json();

        setUser({ userJson });
    }
    useEffect(() => {
        getUser();
    }, []);


    return (
        <View>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                {user.userJson?.data.followedCommunities.map((community, index) => {

                    return (< CommunityItem key={index} detail={props.navigation} data={community} />)
                })}
            </ScrollView>
        </View>
    )
}

export default FollowedCommunities