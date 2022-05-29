import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = (props) => {
    const [isLiked, setIsLiked] = useState(false);


    const like = () => {
        setIsLiked(!isLiked);
    }

    const animation = React.useRef(null);
    const isFirstRun = React.useRef(true);

    React.useEffect(() => {
        if (isFirstRun.current) {
            if (isLiked) {
                animation.current.play(66, 66);
            } else {
                animation.current.play(19, 19);
            }
            isFirstRun.current = false;
        } else if (isLiked) {
            animation.current.play(19, 50);
        } else {
            animation.current.play(0, 19);
        }
    }, [isLiked]);

    const navigateToDetail = () => {
        props.detail.navigate('Etkinlik', props.data);
    }

    const generateButton = () => {
        if (props.data.state === "Active")
            return <TouchableOpacity style={styles.card_button} onPress={navigateToDetail}>
                <Text style={styles.buttonText}>Detaylar</Text>
            </TouchableOpacity>
        else if (props.data.state === "Canceled")
            return <TouchableOpacity style={styles.card_button}>
                <Text style={styles.buttonText}>Etkinlik İptal Edildi</Text>
            </TouchableOpacity>
        else if (props.data.state === "Ended")
            return <TouchableOpacity style={styles.card_button}>
                <Text style={styles.buttonText}>Etkinlik Sona Erdi</Text>
            </TouchableOpacity>
    }
    return (
        <View style={styles.card_container}>
            {props.likeButtonActive === true ? <TouchableOpacity onPress={like} style={styles.lottieContainer}>
                <LottieView
                    ref={animation}
                    style={styles.heartLottie}
                    source={require('../../../assets/lottie/like.json')}
                    autoPlay={false}
                    loop={false}
                />
            </TouchableOpacity> : ''}
            <ImageBackground style={styles.image} source={{ uri: 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg' }} >


            </ImageBackground>
            <View style={styles.card_body}>
                <View style={styles.card_header}>
                    <Text style={styles.card_title}>{props.data.title}</Text>
                    <Text style={styles.community}> {props.data.eventOf.name}</Text>
                </View>


                <Text numberOfLines={2}>{props.data.description}</Text>
                <View style={styles.card_footer}>
                    <Text>{props.data.date}</Text>
                    <Text>{props.data.location}</Text>
                    <Text>{props.data.tags}</Text>



                </View>
                {generateButton()}
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    card_container: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    card_header: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    card_title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 3,
    },
    lottieContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        margin: -10,
    },
    heartLottie: {

        width: 80,
        height: 80
    },
    community: {
        flex: 1,
        color: 'black',
    },
    image: {
        height: Dimensions.get('window').height / 4,
    },
    card_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Card