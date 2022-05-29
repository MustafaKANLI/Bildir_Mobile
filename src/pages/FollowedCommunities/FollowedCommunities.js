import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './FollowedCommunities.style'

const FollowedCommunities = () => {

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
            {console.log("ne geliyor", user.userJson?.data.followedCommunities)}
            {user.userJson?.data.followedCommunities.map((community) => {
                console.log("bu bir com", community)
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>{community.name}</Text>
                        <Text>{community.email}</Text>
                        <Text>{community.description}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default FollowedCommunities