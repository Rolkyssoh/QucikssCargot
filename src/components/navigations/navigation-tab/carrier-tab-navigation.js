import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarHome from './tab-bar.component';
import PublishedMissionScreen from '../../../screens/carrier/published-mission-screen';
import CarrierProfileScreen from '../../../screens/carrier/carrier-profile-screen';
 
const CarrierTab = createBottomTabNavigator()

const   CarrierProfileNavigation = () => { 

    useEffect(() =>{
        let isCancelled = false;
        return () => {
            isCancelled = true;
        };
    },[]) 

    return( 
        <CarrierTab.Navigator tabBar={(props) => <TabBarHome {...props} />}>
            <CarrierTab.Screen 
                name="Missions" 
                component={PublishedMissionScreen}
                initialParams={{ icon: 'home'}}
            />
            <CarrierTab.Screen 
                name="Profile"
                component={CarrierProfileScreen}
                initialParams={{ icon: 'user'}}
            />
        </CarrierTab.Navigator>
    )
}

export default CarrierProfileNavigation;