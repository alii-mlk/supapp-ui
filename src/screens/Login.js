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
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatButton from '../shared/Button';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


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
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Image source={require('../assets/images/login.jpg')} />

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
})