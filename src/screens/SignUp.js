import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Keyboard,
    TextInput,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../shared/Button';
import API from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import MyAppHeader from '../shared/MyAppText';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';

export default function SignUp({ navigation }) {
    const { loginHandler } = useContext(CurrentUserContext);
    const apiCall = useRef(undefined);
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '+98',
        deviceId: '',
        password: '',
        confirmPass: '',
    })
    const [error, setError] = useState(undefined)
    const onUserNameChange = (value) => {
        var u = { ...user };
        u.username = value;
        setUser(u);
    }
    const onPassChange = (value) => {
        var u = { ...user };
        u.password = value;
        setUser(u);
    }
    const onConfirmPassChange = (value) => {
        var u = { ...user };
        u.confirmPass = value;
        setUser(u);
    }
    const onEmailChange = (value) => {
        var u = { ...user };
        u.email = value;
        setUser(u);
    }
    const onPhoneChange = (value) => {
        var u = { ...user };
        u.phone = value;
        setUser(u);
    }
    // const storeData = async (value) => {
    //     try {
    //         let localStorageItems = {
    //             username: user.username,
    //             token: value
    //         }
    //         await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
    //         console.log(`items written in signup to local storage${JSON.stringify(localStorageItems)}`);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePhone(phone) {
        const re = /^(\+98|0098|98|0)?9\d{9}$/g;
        return re.test(String(phone));
    }
    const onSubmitHandler = async () => {
        if (user.username.length === 0 || user.password.length === 0 || user.confirmPass.length === 0 || user.email === 0 || user.phone === 0) {
            alert("Fields can't be empty!");
            return;
        }
        if (user.username.length < 3) {
            alert('username must be at least 3 characters!');
            return false;
        }
        if (user.password.length < 3) {
            alert('password must be at least 3 characters!');
            return;
        }
        if (user.confirmPass.length < 3) {
            alert('confirm password must be at least 3 characters!!');
            return;
        }
        if (user.confirmPass !== user.password) {
            alert('Password  and confirm password missmatch !!');
            return;
        }
        let isPhonevalid = validatePhone(user.phone)
        if (!isPhonevalid) {
            alert('Please enter phone correctly!');
            return false;
        }
        if (user.phone.length < 3) {
            alert('password must be at least 3 characters!');
            return;
        }
        let isMailValid = validateEmail(user.email)
        if (!isMailValid) {
            alert('Please enter email correctly!');
            return false;
        }
        try {
            apiCall.current = API.request('/auth/register', true, {
                username: user.username,
                password: user.password,
                email: user.email,
                phone_number: user.phone,
                device_id: user.deviceId,
            });
            const res = await apiCall.current.promise
            console.log(res.status);
            if (res.status == 400) {
                setError('User with this username alreay exists!');
            }
            //saving token recieved in phone storage
            const data = await res.json();
            if (data.message == 'Signup successfully')
                navigation.navigate('Login')
            else {
                setError('Error acured')
            }
        }

        catch (err) {
            console.log('in catch')
            console.log(err);
            setError('Error accured!');
        }
    }
    useEffect(() => {
        let deviceId = DeviceInfo.getDeviceId();
        var u = { ...user };
        u.deviceId = deviceId;
        setUser(u);
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <MyAppHeader bold={true} isTitle={true} style={{ textAlign: 'center', fontSize: 30 }}>Signup</MyAppHeader>
                        <Image source={require('../assets/images/signup1.png')} style={styles.image} />
                        <View style={styles.inputsWrapper}>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="user" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    underlineColorAndroid="transparent"
                                    value={user.username}
                                    onChangeText={onUserNameChange}
                                />
                            </View>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="at" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    underlineColorAndroid="transparent"
                                    value={user.email}
                                    onChangeText={onEmailChange}
                                />
                            </View>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="phone" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone number"
                                    underlineColorAndroid="transparent"
                                    value={user.phone}
                                    onChangeText={onPhoneChange}
                                />
                            </View>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="lock" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    underlineColorAndroid="transparent"
                                    value={user.password}
                                    onChangeText={onPassChange}
                                    secureTextEntry={true}
                                />
                            </View>

                            <View style={styles.inputSection}>
                                <Icon style={styles.searchIcon} name="check" size={20} color="#000" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm password"
                                    underlineColorAndroid="transparent"
                                    value={user.confirmPass}
                                    onChangeText={onConfirmPassChange}
                                />
                            </View>
                            {error ? <MyAppHeader style={{ color: 'red', }}>{error}</MyAppHeader> : undefined}
                            <FlatButton text={'signup'} buttonColor={'purple'} onPressHandler={onSubmitHandler} />
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <MyAppHeader style={{ textAlign: 'center', color: 'blue' }}>Already have account? Login!</MyAppHeader>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView  >
        </KeyboardAvoidingView >
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
        flex: 3
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
