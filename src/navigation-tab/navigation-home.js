import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home-screen';
import ProfileScreen from '../screens/profile-screen';
import TabBar from '../components/tab-bar.component';

const Tab = createBottomTabNavigator()

const NavigationHome = () => {
    return(
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
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