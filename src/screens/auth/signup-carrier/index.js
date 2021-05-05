import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CarInfosScreen from './car-infos-screen';
import CarrierInfosScreen from './carrier-infos-screen';
import MaterialTabBar from '../../../components/navigations/material-tab.component';
import DrivingLicenseScreen from './driving-licencse-screen';
import CarImageScreen from './car-image-screen';

const ShareTab = createMaterialTopTabNavigator()

const CarrierSignupScreen = () => {
    return(
        <ShareTab.Navigator
            tabBar={(props) => <MaterialTabBar {...props} />}
            tabBarPosition='bottom'
        >
            <ShareTab.Screen 
                name="CarrierInfos" 
                component={CarrierInfosScreen} 
            />
            <ShareTab.Screen 
                name="DrivingLicense"
                component={DrivingLicenseScreen}
            />
            <ShareTab.Screen 
                name="CarInfos" 
                component={CarInfosScreen} 
            /> 
            <ShareTab.Screen 
                name="CarImage"
                component={CarImageScreen}
            />
        </ShareTab.Navigator>
    )
}

export default CarrierSignupScreen