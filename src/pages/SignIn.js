import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Logo from '../../assets/images/bildirLogo.png';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
{
  "email": "20190808043@ogr.akdeniz.edu.tr",
  "password": "Fatih123."
}
*/

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToHome = async () => {
    try {
      const response = await fetch(
        'http://bildir.azurewebsites.net/api/Account/authenticate',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const json = await response.json();

      if (json.succeeded) {
        await AsyncStorage.setItem('token', json.data.jwToken);
        await AsyncStorage.setItem('role', json.data.roles[0]);

        props.navigation.navigate('EtkinliklerTab');
      }
    } catch (e) {
      console.error('hata', e);
    }
  };
  BackHandler.addEventListener('hardwareBackPress', function () {
    props.navigation.navigate('EtkinliklerTab');
    return true;
  });

  useEffect(() => {
    goToHome();
  }, []);

  const goToSignUp = () => {
    props.navigation.navigate('Sign Up');
  };
  const onEmailChange = e => {
    setEmail(e);
  };
  const onPasswordChange = e => {
    setPassword(e);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.inputContainer}>
        <Input onChangeText={onEmailChange} label="E-posta" />
        <Input onChangeText={onPasswordChange} label="Şifre " />
      </View>
      <Text>Şifremi Unuttum</Text>
      <TouchableOpacity style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <Text style={styles.bottomText} onPress={goToSignUp}>
        Yeni hesap oluştur
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  logo: {
    marginTop: 50,
    height: Dimensions.get('window').height / 4,
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#b0045c',
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
    position: 'absolute',
    bottom: 30,
  },
});

export default SignIn;
