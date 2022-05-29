import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, StyleSheet, Button, ImageBackground } from "react-native";
import Logo from '../../assets/images/bildirLogo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {

    const [user, setUser] = useState({});

    const getUser = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            props.navigation.navigate('Sign In');
            return;
        }

        const role = await AsyncStorage.getItem('role');

        const userResponse = await fetch(
            "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const userJson = await userResponse.json();

        setUser({ token, role, userJson });
    }

    useFocusEffect(
        useCallback(() => {
            getUser()
        }, [])
    );

    const signout = async () => {
        try {
            props.navigation.navigate('Etkinlikler');


            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('role');

            setUser({})
        }
        catch (exception) {
            console.error(exception)
        }
    }

    const signin = () => {
        props.navigation.navigate('Sign In');
    }

    const participated = () => {
        props.navigation.navigate('Katıldığım Etkinlikler');
    }
    const followedCommunities = () => {
        props.navigation.navigate('Takip Ettiğim Topluluklar');
    }


    return (

        < View style={styles.container} >
            {//console.log("userr", user.userJson.data.firstName)
            }
            <View style={styles.profileInfo}>
                <View style={styles.head}>
                    <View style={styles.image} >
                        <ImageBackground source={Logo} resizeMode="cover" style={styles.pp} ></ImageBackground>
                    </View>
                    <View style={styles.name}>
                        {user.userJson && <View>
                            <Text style={styles.userName}>{user.userJson?.data.firstName}{user.userJson?.data.lastName}</Text>
                            <Text>{user.userJson?.data.schoolEmail}</Text>
                            <Text>{user.userJson?.data.department}</Text>
                        </View>}

                    </View>

                </View>
                <View style={styles.menu}>
                    <Button
                        onPress={participated}
                        title="Katıldığım Etkinlikler"
                        color="#841584" />
                    <Button
                        onPress={followedCommunities}
                        title="Takip ettiğim Topluluklar"
                        color="#841584" />
                    {
                        user.token ? (
                            <Button
                                onPress={signout}
                                title="Çıkış Yap"
                                color="#841584" />)
                            : (<Button
                                onPress={signin}
                                title="Giriş Yap"
                                color="#841584" />)
                    }
                </View>

            </View>
        </ View>
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
        height: 150,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 50,
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
        marginLeft: 20,
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