import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import Welcome from '../screens/Welcome';
import LoadingView from '../shared/LoadingView'
import API from '../utils/api';
import HomePage from '../screens/HomePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Map" as that's the first screen inside the tab navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home page';
    switch (routeName) {
        case 'Profile':
            return 'Profile';
    }
}

const ScreenRouter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, loginHandler } = useContext(CurrentUserContext);
    const apiCall = useRef(undefined);
    const checkToken = async () => {
        let token = undefined;
        let recievedUsername = undefined;
        let recievedId = undefined;
        let localStorageItem = await getData();
        localStorageItem = await JSON.parse(localStorageItem)
        if (localStorageItem !== null && localStorageItem !== undefined) {
            token = localStorageItem.token;
            recievedUsername = localStorageItem.username;
            recievedId = localStorageItem.id;
        }
        else {
            setIsLoading(false);
        }
        if (token !== undefined) {
            try {
                apiCall.current = API.request('/auth/check-token', true, {
                    token: localStorageItem.token,
                });
                const res = await apiCall.current.promise
                const data = await res.json();
                console.log(data)
                if (data.message == 'Valid token') {
                    loginHandler(token, recievedUsername, recievedId);
                    setIsLoading(false)
                }
            }
            catch (err) {
                console.log('in catch')
                console.log(err);
                setIsLoading(false);
            }
        }
        else {
            setIsLoading(false);
        }
    }
    //reading user credentials from local storage
    const getData = async () => {
        try {
            var value = await AsyncStorage.getItem('user');
            return value;
        } catch (err) {
            // error reading value
            console.log(err)
        }
    }

    useEffect(() => {
        checkToken();
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, []);
    function HomeTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="HomePage" component={HomePage}
                    options={{
                        tabBarLabel: 'HomePage',
                        tabBarIcon: () => (
                            <Icon name="home" size={20} color="#000" />
                        ),
                    }}
                />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: () => (
                            <Icon name="user" size={20} color="#000" />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    if (user.isLoggedIn == true) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Homepage" component={HomeTabs} options={({ route }) => ({
                        headerTitle: getHeaderTitle(route),
                    })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    if (user.isLoggedIn == false) {
        if (isLoading == false) {
            return (
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }
        else if (isLoading == true) return (<LoadingView title="Loading user credential" />)
    }
    else return null
}

export default ScreenRouter