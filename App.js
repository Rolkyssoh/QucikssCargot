import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/auth/login-screen';
import WelcomeScreen from './src/screens/welcom-screen';
import NavigationHome from './src/components/navigations/navigation-tab/navigation-home';
import SettingScreen from './src/screens/setting-screen';
import CarrierSignupScreen from './src/screens/auth/signup-carrier';
import NavigationDrawerMap from './src/components/navigations/drawer-navigation/navigation-map';
import NewMission from './src/screens/mission/new-mission';
import AdminNavigation from './src/components/navigations/navigation-tab/admin-tab-navigation';
import MissionDetails from './src/screens/mission/mission-details';
import { navigationRef } from './src/components/navigations/CustomNavigation';
import RejectionReason from './src/screens/mission/rejection-reason';
import LuggageImages from './src/screens/mission/new-mission/luggage-images'
import ConfirmationCode from './src/screens/auth/confirmation-code-screen';
import AwaitingScreen from './src/screens/awaiting-screen';

const Stack = createStackNavigator()

const App = () => { 
  return (
    <NavigationContainer ref={navigationRef} >
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
              name="CarrierSignup"
              component={CarrierSignupScreen}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name="Drawer" 
              component={NavigationDrawerMap}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name="Mission"
              component={NewMission}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name="ImgLuggage"
              component={LuggageImages}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name="AdminNav"
              component={AdminNavigation}
            />
            <Stack.Screen 
              name="Details"
              component={MissionDetails}
              options={{ headerShown:false }}
            />
            <Stack.Screen 
              name="Rejection"
              component={RejectionReason}
              options={{ headerShown:false}}
            />
            <Stack.Screen 
              name="ConfirmCode"
              component={ConfirmationCode}
            />
            <Stack.Screen 
              name="Awaiting"
              component={AwaitingScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
} ;

