import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, ImageBackground, FlatList } from "react-native";
import Logo from '../../assets/images/bildirLogo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = (props) => {

    const [user, setUser] = useState({});

    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');

        if (!token) {
            props.navigation.navigate('Sign In');

        }
        setUser({ token, role });
        { console.log("m", await AsyncStorage.getItem('token')) }
    }

    useEffect(() => { getUser(); return () => { } }, [])

    const signout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                props.navigation.navigate('Sign In');
            }
            return true;
        }
        catch (exception) {
            return false;
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.profileInfo}>
                <View style={styles.head}>
                    <View style={styles.image} >
                        <ImageBackground source={Logo} resizeMode="cover" style={styles.pp} ></ImageBackground>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.userName}>Murat Eş</Text>
                        <Text>murates.tr@gmail.com</Text>
                    </View>

                </View>
                <View style={styles.menu}>
                    <FlatList
                        data={[
                            { key: 'Takip ettiğim topluluklar' },
                            { key: 'Beğendiğim etkinlikler' },
                            { key: 'Çıkış yap' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                    />
                </View>

                {

                    AsyncStorage.getItem('token') ?
                        <Button
                            onPress={signout}
                            title="Çıkış Yap"
                            color="#841584" />
                        : <Button
                            onPress={signout}
                            title="Giriş Yap"
                            color="#841584" />


                }
                <Button
                    onPress={signout}
                    title="Çıkış Yap"
                    color="#841584" />

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        fontSize: 18,
        height: 44,
        marginTop: 20,
    },
    menu: {
        marginTop: 40,
    },
    profileInfo: {
        marginTop: 16,
        paddingHorizontal: 29,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#dddddd',
        borderWidth: 1,
        backgroundColor: '#dcdcdc'
    },
    pp: {
        width: '100%',
        height: '80%',
        marginTop: 20,
    },
    name: {
        marginLeft: 49,
    },
    head: {
        flexDirection: 'row',
    },
    userName: {
        fontSize: 25,
        color: 'black'
    },

});

export default Profile