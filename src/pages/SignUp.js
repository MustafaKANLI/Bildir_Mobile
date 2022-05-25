import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Logo from '../../assets/images/bildirLogo.png'
import Input from '../components/Input';

const SignUp = (props) => {
    const [isStudent, setIsStudent] = useState(false);

    const setCommunity = () => {
        setIsStudent(false);
    }
    const setStudent = () => {
        setIsStudent(true);
    }

    const goToHome = () => {
        props.navigation.navigate('HomePage');
    }


    const goToSignIn = () => {
        props.navigation.navigate('Sign In');
    }
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} resizeMode='contain' />
            <View style={styles.inputContainer}>
                <View style={styles.accountButtonContainer} >
                    <TouchableOpacity style={styles.accountButton} onPress={setStudent} >
                        <Text style={styles.accountText}>
                            Öğrenci Hesabı
                        </Text>
                    </TouchableOpacity><TouchableOpacity style={styles.accountButton} onPress={setCommunity} >
                        <Text style={styles.accountText}>
                            Topluluk Hesabı
                        </Text>
                    </TouchableOpacity>
                </View>

                <Input label={isStudent ? 'Kullancı Adı' : 'Topluluk İsmi'} />
                <Input label='E-posta' />
                <Input label='Şifre' />
                <Input label='Şifreyi Onayla' />
            </View>

            <TouchableOpacity style={styles.button} onPress={goToHome} >
                <Text style={styles.buttonText}>
                    Kayıt ol
                </Text>
            </TouchableOpacity>
            <Text style={styles.accountText} onPress={goToSignIn}>
                Çoktan bir hesabınız var mı? Giriş yapın
            </Text>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        height: "100%",
    },
    inputContainer: {
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    logo: {
        marginTop: 30,
        height: Dimensions.get('window').height / 4,
        width: '70%',
        maxWidth: 300,
        height: 100,
    },
    accountButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    accountButton: {
        borderRightColor: 'black',
        borderRightWidth: 1,
        backgroundColor: "#E20576",
        flex: 1,
        padding: 5,
    },
    accountText: {
        textAlign: 'center',
        fontSize: 15,
    },
    button: {
        marginTop: 15,
        backgroundColor: "#b0045c",
        borderRadius: 5,
        width: '50%',
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    bottomText: {
        bottom: 0,
    },
})

export default SignUp