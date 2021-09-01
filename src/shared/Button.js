import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
export default function FlatButton(props) {
    return (
        <TouchableOpacity onPress={props.onPressHandler}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingVertical: 18,
        paddingHorizontal: 30,
        backgroundColor: '#2b81c5',
        marginHorizontal: 20,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})
