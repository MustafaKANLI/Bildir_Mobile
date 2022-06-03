import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../assets/images/bildirLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');

    if (!token) {
      props.navigation.navigate('Sign In');
      return;
    }

    const userResponse = await fetch(
      role === 'Student'
        ? 'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn'
        : 'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const userJson = await userResponse.json();

    setUser({token, role, userJson});
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  const signout = async () => {
    try {
      props.navigation.navigate('EtkinliklerTab');

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');

      setUser({});
    } catch (exception) {
      console.error(exception);
    }
  };

  const organized = () => {
    props.navigation.navigate('Organized Events');
  };

  const signin = () => {
    props.navigation.navigate('Sign In');
  };

  const participated = () => {
    props.navigation.navigate('Katıldığım Etkinlikler');
  };
  const followedCommunities = () => {
    props.navigation.navigate('Takip Ettiğim Topluluklar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.head}>
          <View style={styles.image}>
            <ImageBackground
              source={Logo}
              resizeMode="cover"
              style={styles.pp}></ImageBackground>
          </View>

          <View style={styles.name}>
            {user.role === 'Student'
              ? user.userJson && (
                  <View>
                    <Text style={styles.userName}>
                      {user.userJson?.data.firstName}
                    </Text>
                    <Text style={styles.userName}>
                      {user.userJson?.data.lastName}
                    </Text>
                    <Text>{user.userJson?.data.schoolEmail}</Text>
                    <Text>{user.userJson?.data.department}</Text>
                  </View>
                )
              : user.userJson && (
                  <Text style={styles.userName}>{user.userJson.data.name}</Text>
                )}
          </View>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.margin}
            onPress={user.role === 'Student' ? participated : organized}>
            <Text style={styles.buttonText}>
              {user.role === 'Student'
                ? 'Katıldığım Etkinlikler'
                : 'Düzenlediğim Etkinlikler'}
            </Text>
          </TouchableOpacity>
          {user.role === 'Student' && (
            <TouchableOpacity
              style={styles.margin}
              onPress={followedCommunities}>
              <Text style={styles.buttonText}>Takip ettiğim Topluluklar</Text>
            </TouchableOpacity>
          )}

          {user.token ? (
            <TouchableOpacity style={styles.margin} onPress={signout}>
              <Text style={styles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.margin} onPress={signin}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

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
    marginTop: 50,
  },
  margin: {
    backgroundColor: '#841584',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#dcdcdc',
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
    color: 'black',
  },
});

export default Profile;
