import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../screens/customer-user/home-screen';
import ProfileScreen from '../../../screens/customer-user/profile-screen';
import TabBarHome from './tab-bar.component'; 
 
const Tab = createBottomTabNavigator() 

const NavigationHome = () => { 
    return(
        <Tab.Navigator tabBar={(props) => <TabBarHome {...props} customer />}>
            <Tab.Screen 
                name="Home"  
                component={HomeScreen} 
                initialParams={{ icon: 'home'}} 
            /> 
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                initialParams={{ icon: 'user'}}
            />
        </Tab.Navigator>
    )
}

export default NavigationHome;