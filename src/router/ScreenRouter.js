import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import Welcome from '../screens/Welcome';
// import LoadingView from './LoadingView'
import API from '../utils/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


// import PostSingle from './screens/PostSingle';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
// function getHeaderTitle(route) {
// If the focused route is not found, we need to assume it's the initial screen
// This can happen during if there hasn't been any navigation inside the screen
// In our case, it's "Map" as that's the first screen inside the tab navigator
// const routeName = getFocusedRouteNameFromRoute(route) ?? 'Map';
// switch (routeName) {
//     case 'Feed':
//         return 'News feed';
//     case 'Profile':
//         return 'Profile';
//     case 'Activities':
//         return 'Activities';
// }
// }

const ScreenRouter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, loginHandler } = useContext(CurrentUserContext);

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

    function HomeTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarLabel: 'profile',
                        tabBarIcon: () => (
                            <Icon name="user" size={20} color="#000" />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
    // if (user.isLoggedIn == true) {
    //     return (
    //         <NavigationContainer>
    //             <Stack.Navigator>
    //                 <Stack.Screen name="Map" component={HomeTabs} options={({ route }) => ({
    //                     headerTitle: getHeaderTitle(route),
    //                 })}
    //                 />
    //                 <Stack.Screen name="MapSingle" component={MapSingle} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     )
    // }
    // if (user.isLoggedIn == false) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    // }
    // else return null
}

export default ScreenRouter