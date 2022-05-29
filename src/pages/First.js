import React, { useState, useCallback } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Card from "../components/Card/Card";
import Input from "../components/Input/";
import AsyncStorage from '@react-native-async-storage/async-storage';


const First = (props) => {
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            let participations = null;
            if (await AsyncStorage.getItem('role') === 'Student') {
                const userResponse = await fetch(
                    'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
                    {
                        headers: {
                            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                        },
                    }
                );
                const userJson = await userResponse.json();
                participations = userJson?.data?.participatedEvents;
            }

            const response = await fetch(
                'https://bildir.azurewebsites.net/api/v1/Event'
            );

            const data = await response.json();
            let mappedEvents = data.data;

            if (participations)
                mappedEvents = data.data.map((e) => {
                    let foundEvent = participations.find((p) => p.id === e.id);
                    if (foundEvent) e.participationState = foundEvent.participationState;
                    return e;
                });

            setEvents(mappedEvents);
        } catch (error) {
            console.error(error);
        }

    }
    useFocusEffect(
        useCallback(() => {
            getEvents()
        }, [])
    );




    const createEvent = () => {
        props.navigation.navigate('Etkinlik Oluştur');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createEvent} onPress={createEvent} >
                <Text style={styles.createEventText}>
                    +
                </Text>
            </TouchableOpacity>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <Input label='Etkinlik ara' />
                {events.map((d, index) => {

                    return (< Card key={index} detail={props.navigation} data={d} />)
                })}
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    createEvent: {
        position: "absolute",
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
        fontWeight: "bold",
    },
})

export default First;