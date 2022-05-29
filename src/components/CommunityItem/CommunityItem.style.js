import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        borderRadius: 5,
        margin: 10,
        borderWidth: 1,
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        padding: 10,
        paddingTop: 0,
    },
    image: {
        height: Dimensions.get('window').height / 4,
    },
    card_header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
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
    communityLogo: {

        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
})