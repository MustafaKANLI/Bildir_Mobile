import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './CommunityItem.style';
import Logo from '../../../assets/images/gktLogo.jpg';

const CommunityItem = props => {
  const navigateToCommunityPage = () => {
    props.detail.navigate('Topluluk Sayfası', props.data);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={
          props.data.backgroundImage
            ? {
                uri: `https://bildir.azurewebsites.net/${props.data.backgroundImage.path}`,
              }
            : {
                uri: 'https://www.china-admissions.com/wp-content/uploads/2021/06/Divi-Community-Update-May-2020-scaled-1.jpeg',
              }
        }></ImageBackground>
      <View style={styles.body}>
        <View style={styles.card_header}>
          <Text style={styles.title}>{props.data.name}</Text>
          {/* <Image style={styles.communityLogo} source={Logo}></Image> */}
        </View>

        <Text>{props.data.description}</Text>
        <TouchableOpacity
          style={styles.card_button}
          onPress={navigateToCommunityPage}>
          <Text style={styles.buttonText}>Detaylar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityItem;
