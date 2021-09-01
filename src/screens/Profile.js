import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback,
    TextInput,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Profile({ navigation }) {
    const [loggedInUser, setLoggedInUser] = useState(undefined);
    const { user, logOutHandler } = useContext(CurrentUserContext);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUser();
            console.log('use effect called')
            setLoadingDone(false)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
    const loadUser = async () => {
        console.log(user.username);
        try {
            apiCall.current = API.request('/find-user', true, {
                username: user.username,
            });
            const res = await apiCall.current.promise
            const data = await res.json();
            console.log(data.username)
            setLoggedInUser(data);
            console.log(`user ${loggedInUser}`);
        }
        catch (err) {
            console.log('in loadUser catch')
            console.log(err);
        }
    }
    const onEditBioChange = (value) => {
        setEditBio(value)
    };
    const handleEditBioSubmit = async () => {
    }
    //logout is only handling from client side 
    //we simply remove jwt token from local storage and redirect to login page and on componentDidMount we make api call with undefined token which makes user login fail. EZ right? :D
    const onLogOutSubmit = async () => {
        removeTokenFromLocalStorage();
        logOutHandler()
    }
    const removeTokenFromLocalStorage = async () => {
        try {
            let localStorageItems = {
                username: user.username,
                token: undefined
            }
            await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
        } catch (error) {
            console.log(error)
        }
    }

    // if (loadingDone) {
    return (
        <View style={styles.container}>

        </View>
    );
    // }
    // else {
    //     return <View style={styles.circularProgressContainer}>
    //         <ActivityIndicator size="large" color="blue" />
    //         <Text>Loading user credentials </Text>
    //         <Text>Please wait...</Text>
    //     </View>
    // }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
