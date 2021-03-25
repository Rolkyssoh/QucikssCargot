import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../screens/welcom-screen';
import LoginScreen from '../../screens/auth/login-screen';
import NavigationHome from '../../navigation-tab/navigation-home';
import MapScreen from '../../screens/map-screen';

const Stack = createStackNavigator()

const StackNav = () => {
    return(
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen 
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown:false }}
            />
            <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{ title:''}}
            />
            <Stack.Screen $
                name="NavTab"
                component={NavigationHome}
                options={{ title:'' }}
            />
            <Stack.Screen 
                name="Map"
                component={MapScreen}
                options={{ headerShown:false }}
            />
        </Stack.Navigator>
    )
}

export default StackNav;