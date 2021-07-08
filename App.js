import React, { useEffect, useState } from 'react';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
import CarrierMissionDetailScreen from './src/screens/mission/carrier-mission-detail-screen';
import { navigationRef } from './src/components/navigations/CustomNavigation';
import RejectionReason from './src/screens/mission/rejection-reason';
import LuggageImages from './src/screens/mission/new-mission/luggage-images'
import ConfirmationCode from './src/screens/auth/confirmation-code-screen';
import AwaitingScreen from './src/screens/awaiting-screen';
import CarrierProfileNavigation from './src/components/navigations/navigation-tab/carrier-tab-navigation';
import LoadingAuthScreen from './src/screens/loading-auth-screen';
import AddInfosScreen from './src/screens/auth/add-infos-screen';
import CustomerMissions from './src/screens/customer-user/customer-missions';
import OfferReceivedScreen from './src/screens/customer-user/offer-received-screen';
import StartMissionScreen from './src/screens/mission/start-mission-screen';
import CarrierInfosScreen from './src/screens/carrier/carrier-infos-screen';
import CarrierExecutedMissionScreen from './src/screens/carrier/carrier-executed-mission-screen';


const Stack = createStackNavigator()

const App = (props) => {
  const [isSignedIn, setIsSignedIn] = useState()

  useEffect(() => {
    // if(props.)
    console.log('in app component: ', props)
    console.log('the props reducer : ', props.currentUser)
    
    // const unsubscribe = props.navigation.addListener('focus', () => {
    if(props.currentUser){
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }

  // return() => {
  //     unsubscribe;
  // } props.theStore.confirmationCode.currentUser

  },[props.currentUser])

  return (
    <NavigationContainer ref={navigationRef} >
        <Stack.Navigator initialRouteName="Welcome">
            {/* <Stack.Screen 
              name="LoadingAuth"
              component={LoadingAuthScreen}
              options={{ headerShown:false }}
            /> */}
            {  
              !isSignedIn ?
              (<> 
                <Stack.Screen 
                  name="LoadingAuth"
                  component={LoadingAuthScreen}
                  options={{ headerShown:false }}
                />
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
                  name="ConfirmCode" 
                  component={ConfirmationCode} 
                  options={{headerShown: false}}
                />
                <Stack.Screen 
                  name="CarrierSignup" 
                  component={CarrierSignupScreen}
                  options={{ headerShown:false }}
                />
              </>)
              :
              (<>
                <Stack.Screen 
                    name="LoadingAuth"
                    component={LoadingAuthScreen}
                    options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="AddInfos"
                  component={AddInfosScreen}
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="Awaiting"
                  component={AwaitingScreen}
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                    name="NavTab"
                    component={NavigationHome}
                    // options={{ title:'' }}
                    options={{ headerShown:false }}
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
                <Stack.Screen 
                  name="ManageMission"
                  component={NewMission}
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="Customer"
                  component={CustomerMissions}
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
                  options={{ headerShown:false }} 
                />
                <Stack.Screen 
                  name="CarrierNav"
                  component={CarrierProfileNavigation}
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="Details"
                  component={CarrierMissionDetailScreen}
                  options={{ headerShown:false }}
                />
                <Stack.Screen 
                  name="OfferReceived"
                  component={OfferReceivedScreen}
                  options={{ title:'' }}
                />
                <Stack.Screen  
                  name="StartMission"
                  component={StartMissionScreen}
                  options={{ headerShown:false  }}
                />
                <Stack.Screen 
                  name="Rejection"
                  component={RejectionReason}
                  options={{ headerShown:false}}
                />
                <Stack.Screen 
                  name="CarrierInfos"
                  component={CarrierInfosScreen}
                  options={{ title:'' }}
                />
                <Stack.Screen 
                  name="CarrierExec"
                  component={CarrierExecutedMissionScreen}
                  options={{ headerShown:false}}
                />
              </>)
            }
        </Stack.Navigator> 
    </NavigationContainer>
  );
};

const mapStateToProps = (state) =>{
  return{
      currentUser: state.confirmationCode.currentUser
  }
}

const AppConnected = connect(mapStateToProps)(App)

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  return(
    <Provider store={store}>
      <AppConnected />
    </Provider>
  )
} ;

