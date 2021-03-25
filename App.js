import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/auth/login-screen';
import WelcomeScreen from './src/screens/welcom-screen';
import NavigationHome from './src/navigation-tab/navigation-home';
import NavigationDrawerMap from './src/components/drawer-navigation/navigation-map';
import SettingScreen from './src/screens/setting-screen';

const Stack = createStackNavigator()

const App1 = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen 
                name="Welcome" 
                component={WelcomeScreen} 
                options={{ headerShown:false }}
            />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ title:'' }}
            /> 
            <Stack.Screen 
                name="NavTab"
                component={NavigationHome}
                options={{ title:'' }}
            />
            <Stack.Screen 
              name="Setting"
              component={SettingScreen}
            />
            <Stack.Screen 
              name="Drawer" 
              component={NavigationDrawerMap}
              options={{ headerShown:false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App1;

