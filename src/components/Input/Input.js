import React from 'react'
import { View, TextInput } from 'react-native'
import styles from './Input.style'

const Input = ({ onChangeText, label }) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder={label} onChangeText={onChangeText} />
        </View>
    )
}

export default Input