import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const CreateEvent = props => {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const createEvent = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !location.trim() ||
      !tags.trim()
    ) {
      Toast.show({
        type: 'error',
        text1: 'Boş alanlar',
        text2: 'Etkinliği oluşturmak için lütfen tüm alanları doldurun',
      });

      return;
    }

    try {
      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${props.route.params.token}`,
          },
        },
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const createResponse = await fetch(
        'http://bildir.azurewebsites.net/api/v1/Event',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            location,
            tags,
            communityId: userId,
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          }),
        },
      );
      const createJson = await createResponse.json();
      if (!createJson.succeeded) {
        Toast.show({
          type: 'error',
          text1: 'Etkinlik oluşturulamadı',
          text2: 'Etkinlik oluşturulurken bir hata meydana geldi',
        });
        throw new Error(`Cant create event ${createJson.message}`);
      }

      let imagesUploaded = true;
      let uploadMessage = '';
      if (photos.length !== 0) {
        const body = new FormData();
        photos.forEach(p => body.append('file', p));

        const uploadResponse = await fetch(
          `http://bildir.azurewebsites.net/api/v1/Event/AddImagesToEvent/${createJson.data}`,
          {
            method: 'POST',
            body,
          },
        );
        const uploadJson = await uploadResponse.json();
        imagesUploaded = uploadJson.succeeded;
        uploadMessage = uploadJson.message;
      }

      if (imagesUploaded) {
        Toast.show({
          type: 'success',
          text1: 'Etkinlik Oluşturuldu',
          text2: 'Etkinlik başarıyla oluşturuldu',
        });
        props.navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Etkinlik oluşturulamadı',
          text2: 'Etkinlik oluşturulurken bir hata meydana geldi',
        });
        throw new Error(`Cant create event ${uploadMessage}`);
      }
    } catch (e) {
      console.error('hata mı var', e);
    }
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response) {
        response.assets &&
          setPhotos(arr => [
            ...arr,
            {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
            },
          ]);
      }
    });
  };

  const onTitleChange = e => {
    setTitle(e);
  };
  const onDescriptionChange = e => {
    setdescription(e);
  };
  const onLocationChange = e => {
    setLocation(e);
  };
  const onTagsChange = e => {
    setTags(e);
  };
  const onDateChange = e => {
    setDate(e);
  };

  return (
    <View style={styles.inputsContainer}>
      <ScrollView>
        <Input onChangeText={onTitleChange} label="Etkinliğin İsmi" />

        <Pressable
          onPress={() => {
            setOpen(true);
          }}>
          <TextInput
            style={styles.input}
            editable={false}
            pointerEvents="none"
            placeholder={`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
          />
        </Pressable>
        <DatePicker
          minimumDate={new Date()}
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Input onChangeText={onLocationChange} label="Etkinliğin Konumu" />
        <Input
          onChangeText={onDescriptionChange}
          label="Etkinliğin Açıklaması"
        />
        <Input onChangeText={onTagsChange} label="Etiket Ekle" />

        <View style={styles.photo}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.photo_button}>
            <Text style={styles.buttonText}>Choose Photo</Text>
          </TouchableOpacity>
          {photos.map((p, i) => (
            <Image source={{uri: p.uri}} key={i} style={styles.inputsImage} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.card_button} onPress={createEvent}>
        <Text style={styles.buttonText}>Etkinliği Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputsContainer: {
    height: '100%',
  },
  inputsImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
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
  photo_button: {
    width: 100,
    height: 100,
    backgroundColor: '#1266F1',
    justifyContent: 'center',
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
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});

export default CreateEvent;
