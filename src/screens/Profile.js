import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback,
    TextInput,
    ImageBackground,
    ActivityIndicator,
    ScrollView,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import API from '../utils/api';
import LoadingView from '../shared/LoadingView';
import MyAppText from '../shared/MyAppText';

export default function Profile({ navigation }) {
    const [loggedInUser, setLoggedInUser] = useState(undefined);
    const { user, logOutHandler } = useContext(CurrentUserContext);
    const apiCall = useRef(undefined);
    const [profile, setProfile] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await loadUser();
            setLoading(false)
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
        console.log(user);
        try {
            apiCall.current = API.request(`/auth/user/get/${user.id}`, false, {}, user.token);
            const res = await apiCall.current.promise
            const data = await res.json();
            setProfile(data);
            console.log(profile)
        }
        catch (err) {
            console.log('in loadUser catch')
            console.log(err);
        }
    }
    //logout is only handling from client side 
    //we simply remove jwt token from local storage and redirect to login page and on componentDidMount we make api call with undefined token which makes user login fail.
    //  EZ right? :D
    const onLogOutSubmit = async () => {
        removeTokenFromLocalStorage();
        // logOutHandler()
    }
    // const removeTokenFromLocalStorage = async () => {
    //     try {
    //         let localStorageItems = {
    //             token: undefined
    //         }
    //         await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    if (loading) {
        return <LoadingView title="Loading user credential" />
    }
    else {
        return (
            <View style={styles.container}>
                <MyAppText isTitle={true} bold={true} style={{ textAlign: 'center' }}> welcome {profile.username}</MyAppText>
                <View style={styles.imageCointainer}>
                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Icon name="edit" size={25} color="#000" />
                    </TouchableOpacity>
                    <Image style={styles.profilePic} source={require('../assets/images/login.jpg')} />
                </View>
                <View style={styles.detailsWrapper}>
                    <MyAppText style={styles.detailsText}>Level :0</MyAppText>
                    <MyAppText style={styles.detailsText}>Friends :0</MyAppText>
                    <MyAppText style={styles.detailsText}>Wins :0</MyAppText>
                </View>
                <View style={styles.matchHistoryContainer}>
                    <ScrollView>
                        <View style={styles.matchHistoryRow}>
                            <View style={styles.matchHistoryImageContainer}>
                                <Image style={styles.matchHistoryImage} source={require('../assets/images/login.jpg')} />
                            </View>
                            <View style={styles.matchHistoryTextContainer}>
                                <MyAppText isTitle={true} bold={true}>MineSweeper</MyAppText>
                                <MyAppText isTitle={false} bold={false}>yashar achar folan bisar</MyAppText>
                            </View>
                            <View style={styles.matchStatus} >
                                <MyAppText style={{ textAlign: 'center', color: loading ? 'green' : 'red' }}>Winner</MyAppText>
                            </View>
                        </View>

                        <View style={styles.matchHistoryRow}>
                            <View style={styles.matchHistoryImageContainer}>
                                <Image style={styles.matchHistoryImage} source={require('../assets/images/login.jpg')} />
                            </View>
                            <View style={styles.matchHistoryTextContainer}>
                                <MyAppText isTitle={true} bold={true}>MineSweeper</MyAppText>
                                <MyAppText isTitle={false} bold={false}>yashar achar folan bisar</MyAppText>
                            </View>
                            <View style={styles.matchStatus} >
                                <MyAppText style={{ textAlign: 'center', color: loading ? 'green' : 'red' }}>Winner</MyAppText>
                            </View>
                        </View>
                        <View style={styles.matchHistoryRow}>
                            <View style={styles.matchHistoryImageContainer}>
                                <Image style={styles.matchHistoryImage} source={require('../assets/images/login.jpg')} />
                            </View>
                            <View style={styles.matchHistoryTextContainer}>
                                <MyAppText isTitle={true} bold={true}>MineSweeper</MyAppText>
                                <MyAppText isTitle={false} bold={false}>yashar achar folan bisar</MyAppText>
                            </View>
                            <View style={styles.matchStatus} >
                                <MyAppText style={{ textAlign: 'center', color: loading ? 'green' : 'red' }}>Winner</MyAppText>
                            </View>
                        </View>
                        <View style={styles.matchHistoryRow}>
                            <View style={styles.matchHistoryImageContainer}>
                                <Image style={styles.matchHistoryImage} source={require('../assets/images/login.jpg')} />
                            </View>
                            <View style={styles.matchHistoryTextContainer}>
                                <MyAppText isTitle={true} bold={true}>MineSweeper</MyAppText>
                                <MyAppText isTitle={false} bold={false}>yashar achar folan bisar</MyAppText>
                            </View>
                            <View style={styles.matchStatus} >
                                <MyAppText style={{ textAlign: 'center', color: loading ? 'green' : 'red' }}>Winner</MyAppText>
                            </View>
                        </View>

                    </ScrollView>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    style={styles.modal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <MyAppText>edit profile yaaaaaaaaay</MyAppText>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageCointainer: {
        flex: 8,
        alignItems: 'center',
    },
    editProfileBtn: {
        position: 'absolute',
        top: -20,
        right: 10,

    },
    profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'red',
        resizeMode: 'cover'
    },
    matchHistoryContainer: {
        flex: 12,
    },
    detailsWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    detailsText: {
        flex: 1,
        textAlign: 'center'
    },
    matchHistoryRow: {
        backgroundColor: 'lightgrey',
        marginVertical: 2,
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    matchHistoryImageContainer: {
        flex: 3,
    },
    matchHistoryImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        resizeMode: 'cover',

    },
    matchHistoryTextContainer: {
        flex: 8,
        flexDirection: 'column',
        padding: 5,
    },
    matchStatus: {
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: Dimensions.width,
        height: Dimensions.height
    }
});
