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
import API from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import MyAppHeader from '../shared/MyAppText'


export default function Login({ navigation }) {
    const [newUser, setNewUser] = useState({
        username_or_email: '',
        password: '',

    })
    const { loginHandler } = useContext(CurrentUserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const apiCall = useRef(undefined);

    const onUserNameChange = (value) => {
        var u = { ...newUser };
        u.username_or_email = value;
        setNewUser(u);
    }
    const onPassChange = (value) => {
        var u = { ...newUser };
        u.password = value;
        setNewUser(u);
    }
    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);


    //setting user token in local storage
    const storeData = async (value) => {
        try {
            let localStorageItems = {
                username: newUser.username_or_email,
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
        if (newUser.username_or_email.length === 0) {
            alert('username or email cant be empty!');
            return;
        }
        if (newUser.password.length === 0) {
            alert('Password cant be empty!');
            return;
        }
        if (newUser.username_or_email.length < 3) {
            alert('username must be at least 3 characters!');
            return false;
        }
        if (newUser.password.length < 3) {
            alert('password must be at least 3 characters!');
            return;
        }
        try {
            apiCall.current = API.request('/auth/login', true, {
                username_or_email: newUser.username_or_email,
                password: newUser.password
            });
            const res = await apiCall.current.promise
            let data = await res.json();
            console.log(data);
            if (data.message === "User not found, please signup") {
                setError("User not found, please signup")
            }
            if (data.message == "Login successfully") {
                await storeData(data.token);
                loginHandler(data.token, newUser.username_or_email);
                navigation.navigate('HomePage')
            }
            else {
                setError('Error acurred');
            }
        }
        catch (err) {
            console.log(err);
            setError(true);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <MyAppHeader bold={true} isTitle={true} style={{ textAlign: 'center', paddingTop: 20, fontSize: 30 }}>Login</MyAppHeader>
                        <Image source={require('../assets/images/login.png')} style={styles.image} />
                        <View style={styles.inputsWrapper}>
                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="user" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username or email"
                                    underlineColorAndroid="transparent"
                                    value={newUser.username}
                                    onChangeText={onUserNameChange}
                                />
                            </View>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="lock" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    underlineColorAndroid="transparent"
                                    value={newUser.password}
                                    onChangeText={onPassChange}
                                    secureTextEntry={true}
                                />
                            </View>
                            {error ? <MyAppHeader style={{ color: 'red', textAlign: 'center' }}>{error}</MyAppHeader> : undefined}
                            <FlatButton text={'login'} buttonColor={'purple'} onPressHandler={onSubmitHandler} />
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <MyAppHeader style={{ textAlign: 'center', color: 'blue' }}>Don have account? Signup!</MyAppHeader>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView  >
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    inputsWrapper: {
        flex: 1
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
})
