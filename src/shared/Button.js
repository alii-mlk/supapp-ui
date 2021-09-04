import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
export default function FlatButton(props) {
    let buttonStyle = function (myColor) {
        return {
            borderRadius: 10,
            backgroundColor: myColor,
            borderRadius: 5,
            paddingVertical: 18,
            paddingHorizontal: 30,
            marginHorizontal: 20,
            marginVertical: 10
        }
    }

    return (
        <TouchableOpacity onPress={props.onPressHandler}>
            <View style={buttonStyle(props.buttonColor)}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
})
