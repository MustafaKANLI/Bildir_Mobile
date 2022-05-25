import React, { useState, useEffect } from "react";
import { ScrollView, Text, Button, View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../components/Card/Card";
import Input from "../components/Input/";



const First = (props) => {
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('http://bildir.azurewebsites.net/api/v1/Event');
            const json = await response.json();
            console.log("fatih", json.data);
            setData(json.data)

        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getMovies();
    }, []);



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
                {data.map((d, index) => {
                    console.log("murat", d);
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