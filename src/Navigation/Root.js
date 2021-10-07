import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../components/navigations/CustomNavigation';
import LoadingAuthScreen from '../screens/loading-auth-screen';
import WelcomeScreen from '../screens/welcom-screen';
import LoginScreen from '../screens/auth/login-screen';
import ConfirmationCodeScreen from '../screens/auth/confirmation-code-screen';
import AwaitingScreen from '../screens/awaiting-screen';
import CarrierSignupScreen from '../screens/auth/signup-carrier';
import AddInfosScreen from '../screens/auth/add-infos-screen';
import NavigationHome from './navigation-tab/navigation-home';
import NavigationDrawerMap from '../components/navigations/drawer-navigation/navigation-map';
import NewMission from '../screens/mission/new-mission';
import CustomerMissions from '../screens/customer-user/customer-missions';
import LuggageImages from '../screens/mission/new-mission/luggage-images';
import AdminNavigation from './navigation-tab/admin-tab-navigation';
import CarrierProfileNavigation from './navigation-tab/carrier-tab-navigation';
import MissionDetailsScreen from '../screens/mission/mission-details-screen';
import SettingScreen from '../screens/setting-screen';
import OfferReceivedScreen from '../screens/customer-user/offer-received-screen';
import StartMissionScreen from '../screens/mission/start-mission-screen';
import RejectionReason from '../screens/mission/rejection-reason';
import CarrierInfosScreen from '../screens/carrier/carrier-infos-screen';
import CarrierExecutedMissionScreen from '../screens/carrier/carrier-executed-mission-screen';
import CarrierInProgressMissionScreen from '../screens/carrier/carrier-in-progress-mission-screen';

const Stack = createStackNavigator();

const RootNavigator = props => {
  const [isSignedIn, setIsSignedIn] = useState();

  useEffect(() => {
    // if(props.)
    console.log('in app component: ', props);
    console.log('the props reducer : ', props.user_current);

    // const unsubscribe = props.navigation.addListener('focus', () => {
    if (props.user_current) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }

    // return() => {
    //     unsubscribe;
    // } props.theStore.confirmationCode.currentUser
  }, [props.user_current]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Welcome">
        {/* <Stack.Screen 
              name="LoadingAuth"
              component={LoadingAuthScreen}
              options={{ headerShown:false }}
            /> */}
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="LoadingAuth"
              component={LoadingAuthScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name="ConfirmCode"
              component={ConfirmationCodeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Awaiting"
              component={AwaitingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CarrierSignup"
              component={CarrierSignupScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoadingAuth"
              component={LoadingAuthScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddInfos"
              component={AddInfosScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NavTab"
              component={NavigationHome}
              // options={{ title:'' }}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen
              name="Drawer"
              component={NavigationDrawerMap}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="newMission"
              component={NewMission}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="customerMissions"
              component={CustomerMissions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ImgLuggage"
              component={LuggageImages}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AdminNav"
              component={AdminNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CarrierNav"
              component={CarrierProfileNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="missionDetails"
              component={MissionDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OfferReceived"
              component={OfferReceivedScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name="StartMission"
              component={StartMissionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Rejection"
              component={RejectionReason}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CarrierInfos"
              component={CarrierInfosScreen}
              options={{title: ''}}
            />
            <Stack.Screen
              name="CarrierExec"
              component={CarrierExecutedMissionScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CarrierInProgressMission"
              component={CarrierInProgressMissionScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
