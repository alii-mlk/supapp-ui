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
    const [profileEdit, setProfileEdit] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        phone: '+98',
        email: '',
        sex: '',
        age: '',
        pic: '',
    })
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
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePhone(phone) {
        const re = /^(\+98|0098|98|0)?9\d{9}$/g;
        return re.test(String(phone));
    }
    const onUserNameChange = (value) => {
        var u = { ...profileEdit };
        u.username = value;
        setProfileEdit(u);
    }
    const onPassChange = (value) => {
        var u = { ...profileEdit };
        u.password = value;
        setProfileEdit(u);
    }
    const onConfirmPassChange = (value) => {
        var u = { ...profileEdit };
        u.confirmPass = value;
        setProfileEdit(u);
    }
    const onEmailChange = (value) => {
        var u = { ...profileEdit };
        u.email = value;
        setProfileEdit(u);
    }
    const onPhoneChange = (value) => {
        var u = { ...profileEdit };
        u.phone = value;
        setProfileEdit(u);
    }
    const onSubmitHandler = async () => {
        if (profileEdit.username.length === 0 || profileEdit.password.length === 0 || profileEdit.confirmPass.length === 0 || profileEdit.email === 0 || profileEdit.phone === 0) {
            alert("Fields can't be empty!");
            return;
        }
        if (profileEdit.username.length < 3) {
            alert('username must be at least 3 characters!');
            return false;
        }
        if (profileEdit.password.length < 3) {
            alert('password must be at least 3 characters!');
            return;
        }
        if (profileEdit.confirmPass.length < 3) {
            alert('confirm password must be at least 3 characters!!');
            return;
        }
        if (profileEdit.confirmPass !== profileEdit.password) {
            alert('Password  and confirm password missmatch !!');
            return;
        }
        let isPhonevalid = validatePhone(profileEdit.phone)
        if (!isPhonevalid) {
            alert('Please enter phone correctly!');
            return false;
        }
        if (profileEdit.phone.length < 13) {
            alert('phone must be at least 13 characters!');
            return;
        }
        let isMailValid = validateEmail(profileEdit.email)
        if (!isMailValid) {
            alert('Please enter email correctly!');
            return false;
        }
        try {
            apiCall.current = API.request('/auth/register', true, {
                username: profileEdit.username,
                password: profileEdit.password,
                email: profileEdit.email,
                phone_number: profileEdit.phone,
                sex: profileEdit.sex,
                age: profileEdit.age
            });
            const res = await apiCall.current.promise
            const data = await res.json();
            //   todo
        }

        catch (err) {
            console.log('in catch')
            console.log(err);
            setError('Error accured!');
        }
    }

    const loadUser = async () => {
        console.log(user);
        try {
            apiCall.current = API.request(`/auth/user/get/${user.id}`, false, {}, user.token);
            const res = await apiCall.current.promise
            const data = await res.json();
            console.log("profile======================================================================");
            await setProfile(data);
            console.log(profile)
        }
        catch (err) {
            console.log('in loadUser catch')
            console.log(err);
        }
    }
    const onLogOutSubmit = async () => {
        removeTokenFromLocalStorage();
        // logOutHandler()
    }
    const removeTokenFromLocalStorage = async () => {
        try {
            let localStorageItems = {
                token: undefined
            }
            await AsyncStorage.setItem('user', JSON.stringify(localStorageItems));
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <LoadingView title="Loading user credential" />
    }
    else {
        return (
            <View style={styles.container}>
                <MyAppText isTitle={true} bold={true} style={{ textAlign: 'center' }}> welcome {profile.username}</MyAppText>
                <View style={styles.imageCointainer}>
                    <TouchableOpacity style={styles.logOutBtn}>
                        <Icon name="sign-out" size={25} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editProfileBtn} onPress={() => setModalVisible(true)}>
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
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <MyAppText isTitle={true} bold={true} style={{ textAlign: 'center' }}>Edit profile yaaaaaaaaay</MyAppText>
                            <Icon name="close" size={30} color="#000" style={{ position: 'absolute', top: 0, right: 5 }} />
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
                                    secureTextEntry={true}
                                />
                            </View>
                        </SafeAreaView>
                    </TouchableWithoutFeedback>
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
        left: 10
    },
    logOutBtn: {
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
        height: Dimensions.height,
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
    }
});
