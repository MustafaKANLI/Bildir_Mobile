import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ParticipatedEvents.style'

const ParticipatedEvents = () => {

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

        console.log("followed token", userJson.data.followedCommunities)


        setUser({ userJson });

    }
    useEffect(() => {
        getUser();
    }, []);

    return (
        <View>
            {console.log("userrr", user)}
            {user.userJson?.data.participatedEvents.map((events) => {
                console.log("bu bir com", events.title)
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>{events.title}</Text>
                        <Text>
                            {events.description}
                        </Text>
                        <Text>Konum: {events.location}</Text>
                        <Text>Tarih: {events.date}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default ParticipatedEvents