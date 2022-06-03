import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Logo from '../../assets/images/bildirLogo.png';
import Input from '../components/Input';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'react-native-image-picker';

const SignUp = props => {
  const [isStudent, setIsStudent] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('');

  const [comName, setComName] = useState('');
  const [comDescription, setComDescription] = useState('');
  const [comKey, setComKey] = useState('');

  const setCommunity = () => {
    setIsStudent(false);
  };
  const setStudent = () => {
    setIsStudent(true);
  };

  const goToHome = () => {
    props.navigation.navigate('HomePage');
  };

  const goToSignIn = () => {
    props.navigation.navigate('Sign In');
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response) {
        response.assets &&
          setPhoto({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
      }
    });
  };

  const studentInputs = () => {
    return (
      <View>
        <Input label="İsim" onChangeText={setFirstName} />
        <Input label="Soyisim" onChangeText={setLastName} />
        <Input label="E-posta" onChangeText={setEmail} />
        <Input label="Fakülte" onChangeText={setFaculty} />
        <Input label="Bölüm" onChangeText={setDepartment} />
        <Input label="Cinsiyet" onChangeText={setGender} />
        <Input label="Şifre" onChangeText={setPassword} />
        <Input label="Şifreyi Onayla" onChangeText={setConfirmPassword} />
      </View>
    );
  };

  const communityInputs = () => {
    return (
      <View>
        <Input label="Topluluk İsmi" onChangeText={setComName} />
        <TextInput
          multiline
          numberOfLines={10}
          onChangeText={setComDescription}
          style={styles.input}
          placeholder="Topluluk açıklaması"
        />
        <Input label="E-posta" onChangeText={setEmail} />
        <Input label="Topluluk oluşturma anahtarı" onChangeText={setComKey} />
        <Input label="Şifre" onChangeText={setPassword} />
        <Input label="Şifreyi Onayla" onChangeText={setConfirmPassword} />
        <View style={styles.photo}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.photo_button}>
            <Text style={styles.buttonText}>Choose Photo</Text>
          </TouchableOpacity>
          {photo && (
            <Image source={{uri: photo.uri}} style={styles.inputsImage} />
          )}
        </View>
      </View>
    );
  };

  const signUpHandler = async () => {
    if (isStudent) {
      if (
        // prettier-ignore
        !email || !password || !confirmPassword || !firstName || !lastName || !faculty || !department || !gender
      ) {
        Toast.show({
          type: 'error',
          text1: 'Boş alanlar',
          text2: 'Kayıt olmak için lütfen tüm alanları doldurun',
        });
        return;
      }
    } else {
      if (
        //prettier-ignore
        !email || !password || !confirmPassword || !comName || !comKey || !comDescription
      ) {
        Toast.show({
          type: 'error',
          text1: 'Boş alanlar',
          text2: 'Kayıt olmak için lütfen tüm alanları doldurun',
        });
        return;
      }
    }

    try {
      // const url = `http://10.0.2.3:11111/api/Account/register-${
      //   isStudent ? 'student' : 'community'
      // }`;
      const url = `http://bildir.azurewebsites.net/api/Account/register-${
        isStudent ? 'student' : 'community'
      }`;

      const body = isStudent
        ? {
            firstName,
            lastName,
            faculty,
            department,
            gender,
            schoolEmail: email,
            password,
            confirmPassword,
          }
        : {
            name: comName,
            description: comDescription,
            email,
            creationKey: comKey,
            password,
            confirmPassword,
          };

      const signupResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const signupJson = await signupResponse.json();

      if (!signupJson.succeeded) {
        Toast.show({
          type: 'error',
          text1: 'Kayıt olunamadı',
          text2: `${signupJson.message || 'Hata'}`,
        });

        throw new Error(`Cant signup ${signupJson.message}`);
      }

      if (!isStudent && photo) {
        const body = new FormData();
        body.append('file', photo);

        const uploadResponse = await fetch(
          `http://bildir.azurewebsites.net/api/v1/Community/AddBackgroundImage/${signupJson.data}`,
          {
            method: 'POST',
            body,
          },
        );
        const uploadJson = await uploadResponse.json();
        console.log(uploadJson);
      }

      Toast.show({
        type: 'success',
        text1: 'Kayıt oluşturuldu',
        text2: `Kayıt başarıyla oluşturuldu`,
      });

      props.navigation.navigate('EtkinliklerTab');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContainer}>
          <View style={styles.accountButtonContainer}>
            <TouchableOpacity style={styles.accountButton} onPress={setStudent}>
              <Text style={styles.accountText}>Öğrenci Hesabı</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={setCommunity}>
              <Text style={styles.accountText}>Topluluk Hesabı</Text>
            </TouchableOpacity>
          </View>

          {isStudent ? studentInputs() : communityInputs()}
        </View>

        <TouchableOpacity style={styles.button} onPress={signUpHandler}>
          <Text style={styles.buttonText}>Kayıt ol</Text>
        </TouchableOpacity>
        <Text style={styles.accountText} onPress={goToSignIn}>
          Zaten bir hesabınız var mı? Giriş yapın
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
  photo_button: {
    width: 100,
    height: 100,
    backgroundColor: '#1266F1',
    justifyContent: 'center',
  },
  accountButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountButton: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    backgroundColor: '#E20576',
    flex: 1,
    padding: 5,
  },
  inputsImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
  },
  accountText: {
    textAlign: 'center',
    fontSize: 15,
  },
  photo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
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
    bottom: 0,
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});

export default SignUp;
