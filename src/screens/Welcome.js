import React, { useEffect } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground
} from 'react-native'
import FlatButton from '../shared/Button'
import MyAppHeader from '../shared/MyAppText'

export default function Welcome({ navigation }) {
    useEffect(() => {
        console.log("welcome mounted")
        return () => {
        }
    }, [])
    return (
        <ImageBackground source={require('../assets/images/welcome.jpg')} resizeMode="cover" style={styles.image}>
            <MyAppHeader isTitle={true} bold={true} style={styles.header}>Welcome to super app</MyAppHeader>
            <View style={styles.buttonsWrapper}>
                <FlatButton text={'login'} buttonColor={'blue'} onPressHandler={() => navigation.navigate('Login')} />
                <FlatButton text={'SignUp'} buttonColor={'red'} onPressHandler={() => navigation.navigate('SignUp')} />
                <FlatButton text={'Login with google'} buttonColor={'green'} />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
    header: {
        flex: 1,
        textAlign: 'center',
        paddingTop: 50,
        fontSize: 30
    },
    buttonsWrapper: {
        flex: 5
    }
});