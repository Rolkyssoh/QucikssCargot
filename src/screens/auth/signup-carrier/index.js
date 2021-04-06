import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CarInfosScreen from './car-infos-screen';
import CarrierInfosScreen from './carrier-infos-screen';
import MaterialTabBar from '../../../components/navigations/material-tab.component';

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
                name="CarInfos" 
                component={CarInfosScreen} 
            /> 
        </ShareTab.Navigator>
    )
}

export default CarrierSignupScreen