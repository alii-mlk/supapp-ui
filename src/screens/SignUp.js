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
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function SignUp({ navigation }) {
    const { loginHandler } = useContext(CurrentUserContext);
    const apiCall = useRef(undefined);
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPass: ''
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
    const storeData = async (value) => {
        try {
            let localStorageItems = {
                username: user.username,
                token: value
            }
            await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
            console.log(`items written in signup to local storage${JSON.stringify(localStorageItems)}`);
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async () => {
        if (user.username.length === 0 || user.password.length === 0 || user.confirmPass.length === 0) {
            alert('username, password or confirm pass cant be empty!');
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
    }
    useEffect(() => {
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
                        <Image source={require('../assets/images/signup.jpg')} />
                        <View style={styles.inputSection}>
                        </View>
                        <Text style={{ color: 'red' }}>{error}</Text>
                        <FlatButton text="Signup" onPressHandler={onSubmit} />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text>Have account? Login!</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView  >
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})