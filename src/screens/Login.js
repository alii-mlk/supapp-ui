import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Keyboard,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    ActivityIndicator,
    ImageBackground
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../shared/Button';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import MyAppHeader from '../shared/MyAppText';
import { grey } from 'chalk';

export default function Login({ navigation }) {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',

    })
    const { loginHandler } = useContext(CurrentUserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onUserNameChange = (value) => {
        var u = { ...newUser };
        u.username = value;
        setNewUser(u);
    }
    const onPassChange = (value) => {
        var u = { ...newUser };
        u.password = value;
        setNewUser(u);
    }

    //setting user token in local storage
    const storeData = async (value) => {
        try {
            let localStorageItems = {
                username: newUser.username,
                token: value
            }
            await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
            console.log(`items written to local storage in login page ${JSON.stringify(localStorageItems)}`)
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmitHandler = async () => {
        Keyboard.dismiss();
        if (newUser.username.length === 0 || newUser.password.length === 0) {
            alert('username and password cant be empty!');
            return;
        }
        if (newUser.username.length < 3) {
            alert('username must be at least 3 characters!');
            return false;
        }
        if (newUser.password.length < 3) {
            alert('password must be at least 3 characters!');
            return;
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={require('../assets/images/login.jpg')} resizeMode="cover" style={styles.image}>
                    <View style={styles.inner}>
                        <MyAppHeader isTitle={true} bold={true} style={styles.header}>Login</MyAppHeader>
                        <View style={styles.inputSection}>
                            <Icon style={styles.searchIcon} name="user" size={20} color="#000" />
                            <TextInput
                                style={styles.input}
                                placeholder="User Nickname"
                                value={newUser.username}
                                onChangeText={onUserNameChange}
                            />
                        </View>
                        <View style={styles.inputSection}>
                            <Icon style={styles.searchIcon} name="lock" size={20} color="#000" />
                            <TextInput
                                style={styles.input}
                                placeholder="User password"
                                underlineColorAndroid="transparent"
                                value={newUser.password}
                                onChangeText={onPassChange}
                                secureTextEntry={true}
                            />
                        </View>
                        {error ? <Text style={{ color: 'red', }}>{error}</Text> : undefined}
                        <FlatButton text='Login' onPressHandler={onSubmitHandler} />
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text>Don have account? Signup!</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: -30,
        backgroundColor: 'rgba(240, 239, 239, 0.7)'
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        marginVertical: 10,
        width: '80%'
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        color: '#424242',
        fontSize: 18,
    },
    circularProgressContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
// login:


// signup:
// user name
// email pass
// phone 
// device id