import React from 'react'
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native'
import MyAppText from './MyAppText'
export default function LoadingView(props) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
            <MyAppText isTitle={true}>{props.title}</MyAppText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex: 1
    }
})