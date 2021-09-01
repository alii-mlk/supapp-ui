import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function ErrorScreen(props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.errorText}>{props.text}</Text>
                {props.permissionError ? <Text>{props.permissionError}</Text> : undefined}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Centered horizontally
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: 20
    },
    errorTitle: {
        fontSize: 16
    },
    errorText: {
        textAlign: 'left',
        fontSize: 14

    }
})