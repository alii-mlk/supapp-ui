import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import MyAppText from '../shared/MyAppText'
export default function HomePage() {
    const Achar = "Yaaashaaar"
    return (
        <View style={styles.container}>
            <MyAppText isTitle={true} bold={true} style={{ textAlign: 'center' }}>Choose your game</MyAppText>
            <ScrollView >
                <TouchableOpacity style={styles.gamesWrapper}>
                    <ImageBackground isTitle={true} source={require('../assets/images/login.jpg')} style={styles.gamesBg}>
                        <View style={styles.gameTitleWrapper}>
                            <MyAppText bold={true} style={styles.gameTitle}>Achar</MyAppText>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={styles.gamesWrapper}>
                    <ImageBackground isTitle={true} source={require('../assets/images/signup.jpg')} style={styles.gamesBg}>
                        <View style={styles.gameTitleWrapper}>
                            <MyAppText bold={true} style={styles.gameTitle}>Achar</MyAppText>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gamesWrapper}>
                    <ImageBackground isTitle={true} source={require('../assets/images/comingsoon.jpg')} style={styles.gamesBg}>
                        <View style={styles.gameTitleWrapper}>
                            <MyAppText bold={true} style={styles.gameTitle}>{Achar}</MyAppText>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gamesWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    gamesBg: {
        resizeMode: 'center',
        height: 200,
        flexDirection: 'column-reverse'
    },
    gameTitleWrapper: {
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: 50,
        justifyContent: 'center'
    },
    gameTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
})