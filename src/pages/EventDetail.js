import React, { useState, useCallback } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const EventDetail = (props) => {
    const [participationState, setParticipationState] = useState(props.route.params.participationState ?? '');

    const registerToEvent = async () => {
        try {
            if (!(await AsyncStorage.getItem('token'))) return props.navigation.navigate("Sign In");
            if (await AsyncStorage.getItem('role') !== 'Student')
                console.error('Only students can join');

            const userResponse = await fetch(
                'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
                {
                    headers: {
                        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                    },
                }
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
                }
            );

            const registerJson = await registerResponse.json();
            if (!registerJson.succeeded)
                throw new Error(registerJson.message);
            setParticipationState('Participating');
        } catch (ex) {
            console.log(ex);
        }
    }
    const leaveButtonHandler = async () => {
        try {
            if (!(await AsyncStorage.getItem('token'))) console.error('Not logged in');
            if (await AsyncStorage.getItem('role') !== 'Student')
                console.error('Only students can abandon');

            const userResponse = await fetch(
                'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
                {
                    headers: {
                        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                    },
                }
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
                }
            );

            const abandonJson = await abandonResponse.json();
            setParticipationState('Abandoned');
        } catch (ex) {
            console.log(ex);
        }
    };

    useFocusEffect(useCallback(() => setParticipationState(props.route.params.participationState ?? ''), []));

    return (
        <View style={styles.card_container}>
            <ImageBackground style={styles.image} source={{ uri: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg' }} >


            </ImageBackground>
            <View style={styles.card_body}>
                <View style={styles.card_header}>
                    <Text style={styles.card_title}>{props.route.params.title}</Text>
                    <Text style={styles.community}>{props.route.params.eventOf.name}</Text>
                </View>

                <View style={styles.card_timeLocation}>
                    <Text>Olbia Çarşısı</Text>
                    <Text>18.30</Text>
                    <Text>10/06/2022</Text>
                </View>
                <Text style={styles.tags}>#kariyer#girişimcilik#gelişim#liderlik</Text>
                <Text >Lorem Ipsum is simply dummy text of the pstry'
                    rem Ipsum is simply dummy text of the pstry's standard dummy text ever since the 1500s, when
                    an unknown printer took a s standard dummy text ever since the 1500s, when
                    an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                {participationState !== "Participating" ?
                    <TouchableOpacity style={styles.card_button} onPress={registerToEvent}>
                        <Text style={styles.buttonText}>{"Etkinliğe Katıl"}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.card_button} onPress={leaveButtonHandler}>
                        <Text style={styles.buttonText}>{"Ayrıl"}</Text>
                    </TouchableOpacity>}
            </View>

        </View>
    )
}
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
    }
});

export default EventDetail