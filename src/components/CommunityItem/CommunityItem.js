import React from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import styles from './CommunityItem.style'

const CommunityItem = (props) => {

    const navigateToCommunityPage = () => {
        props.detail.navigate('Topluluk Sayfası', props.data);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {props.data.name}
            </Text>
            <Text>
                {props.data.description}
            </Text>
            <TouchableOpacity style={styles.card_button} onPress={navigateToCommunityPage}>
                <Text style={styles.buttonText}>Detaylar</Text>

            </TouchableOpacity>

        </View>
    )
}

export default CommunityItem