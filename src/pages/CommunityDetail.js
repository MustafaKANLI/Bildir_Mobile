import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import Logo from '../../assets/images/gktLogo.jpg'


const CommunityDetail = (props) => {

    const navigateToDetail = () => {
        props.detail.navigate('eventDetail');
    }
    return (
        <View style={styles.card_container}>
            <ImageBackground style={styles.image} source={{ uri: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg' }} >


            </ImageBackground>

            <View style={styles.card_body}>
                <View style={styles.card_header}>
                    <Text style={styles.card_title}>{props.route.params.name}</Text>
                    <Image style={styles.communityLogo} source={Logo}></Image>
                </View>


                <Text style={styles.tags}>#kariyer#girişimcilik#gelişim#liderlik</Text>
                <Text>E-posta: {props.route.params.email}</Text>
                <Text >{props.route.params.description}</Text>

                <TouchableOpacity style={styles.card_button} onPress={navigateToDetail}>
                    <Text style={styles.buttonText}>Topluluğu Takip Et</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    card_container: {
        margin: 10,
        flex: 1,
    },
    card_header: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    card_title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 3,
    },
    tags: {
        color: 'blue',
        marginBottom: 10,
    },
    communityLogo: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    image: {
        height: Dimensions.get('window').height / 4,
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
    card_body: {
        padding: 15,
    }
});

export default CommunityDetail