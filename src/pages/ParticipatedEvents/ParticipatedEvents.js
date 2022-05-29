import { View, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card/Card'
import { useFocusEffect } from '@react-navigation/native';



const ParticipatedEvents = (props) => {

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
    useFocusEffect(
        useCallback(() => { getUser() }, [])
    );

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                {user.userJson?.data.participatedEvents.map((event, index) => {
                    if (event.participationState === "Participating")
                        return (< Card key={index} detail={props.navigation} likeButtonActive={true} data={event} />)
                })}
            </ScrollView>
        </View>
    )
}

export default ParticipatedEvents