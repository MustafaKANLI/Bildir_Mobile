import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import * as ImagePicker from "react-native-image-picker"


const CreateEvent = () => {

    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [date, setDate] = useState("");

    const createEvent = async () => {
        try {
            const response = await fetch('http://bildir.azurewebsites.net/api/v1/Event', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    location,
                    tags,
                    communityId: '1',
                    date
                })
            });
            const json = await response.json();
            console.log("bu nedur", json)

        } catch (e) {
            console.log("hata mı var", e)

        }
    }

    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response) {
                console.log(response.assets[0].uri);

                setPhoto(response.assets[0].uri);
            }
        });
    }

    const onTitleChange = (e) => {
        setTitle(e);
    }
    const onDescriptionChange = (e) => {
        setdescription(e);
    }
    const onLocationChange = (e) => {
        setLocation(e);
    }
    const onTagsChange = (e) => {
        setTags(e);
    }
    const onDateChange = (e) => {
        setDate(e);
    }

    return (
        <View style={styles.inputsContainer}>
            <ScrollView>

                <Input onChangeText={onTitleChange} label="Etkinliğin İsmi" />
                <Input onChangeText={onDateChange} label="Etkinliğin Tarihi" />
                <Input onChangeText={onLocationChange} label="Etkinliğin Konumu" />
                <Input onChangeText={onDescriptionChange} label="Etkinliğin Açıklaması" />
                <Input onChangeText={onTagsChange} label="Etiket Ekle" />


                <View style={styles.photo}>
                    <TouchableOpacity onPress={handleChoosePhoto} style={styles.photo_button} >
                        <Text style={styles.buttonText}>Choose Photo</Text>
                    </TouchableOpacity>
                    {

                        photo ? (<Image
                            source={{ uri: photo }} style={styles.inputsImage} />) :
                            <View style={styles.inputsImage}></View>
                    }
                </View>
            </ScrollView>



            <TouchableOpacity style={styles.card_button} onPress={createEvent} >
                <Text style={styles.buttonText}>Etkinliği Oluştur</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    inputsContainer: {
        height: '100%'
    },
    inputsImage: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
    },
    photo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'

    },
    photo_button: {
        width: 100,
        height: 100,
        backgroundColor: '#1266F1',
        justifyContent: 'center'
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
})

export default CreateEvent