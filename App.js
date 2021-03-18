import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/auth/login-screen';
// import HomeScreen from './src/screens/home-screen';
import WelcomeScreen from './src/screens/welcom-screen';
import MapScreen from './src/screens/map-screen';
import NavigationHome from './src/navigation-tab/navigation-home';

const Stack = createStackNavigator()

const App = () => {
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
		    <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
