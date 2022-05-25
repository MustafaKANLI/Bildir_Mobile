import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

const EventDetail = (props) => {

    console.log(props.route.params);
    const navigateToDetail = () => {
        props.detail.navigate('eventDetail');
    }
    return (
        <View style={styles.card_container}>
            <ImageBackground style={styles.image} source={{ uri: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg' }} >


            </ImageBackground>
            <View style={styles.card_body}>
                <View style={styles.card_header}>
                    <Text style={styles.card_title}>{props.route.params.title}</Text>
                    <Text style={styles.community}>{props.route.params.eventOf.name}</Text>
                </View>

                <View style={styles.card_timeLocation}>
                    <Text>Olbia Çarşısı</Text>
                    <Text>18.30</Text>
                    <Text>10/06/2022</Text>
                </View>
                <Text style={styles.tags}>#kariyer#girişimcilik#gelişim#liderlik</Text>
                <Text >Lorem Ipsum is simply dummy text of the pstry'
                    rem Ipsum is simply dummy text of the pstry's standard dummy text ever since the 1500s, when
                    an unknown printer took a s standard dummy text ever since the 1500s, when
                    an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>

                <TouchableOpacity style={styles.card_button} onPress={navigateToDetail}>
                    <Text style={styles.buttonText}>Etkinliğe Katıl</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    card_container: {
        margin: 10,
        height: '100%',
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
    community: {
        flex: 1,
        color: 'black',
    },
    image: {
        height: Dimensions.get('window').height / 4,
    },
    card_timeLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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

export default EventDetail