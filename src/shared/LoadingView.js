import React from 'react'
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native'

export default function LoadingView(props) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex: 1
    },
    title: {
        fontSize: 16
    }
})