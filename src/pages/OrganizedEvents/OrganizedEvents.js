import { View, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import Card from '../../components/Card/Card'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrganizedEvents = (props) => {
    const [organizedEvents, setOrganizedEvents] = useState([]);
    const [user, setUser] = useState({});


    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');

        setUser({ token, role });
    }

    const getEvents = async () => {
        try {

            if (await AsyncStorage.getItem('role') === 'Community') {
                const userResponse = await fetch(
                    'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
                    {
                        headers: {
                            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                        },
                    }
                );
                const userJson = await userResponse.json();
                setOrganizedEvents(userJson.data.organizedEvents);
            }
        }
        catch (Ex) {
            console.error(Ex);
        }
    }

    const getData = async () => {
        await getUser();
        await getEvents();
    }

    useFocusEffect(
        useCallback(() => {
            getData()
        }, [])
    );
    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">

                {organizedEvents.map((d, index) => {
                    return (< Card key={index} detail={props.navigation} likeButtonActive={false} data={d} user={user} />)
                })}
            </ScrollView>
        </View>
    )
}

export default OrganizedEvents;