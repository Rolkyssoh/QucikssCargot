import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarHome from './tab-bar.component';
import WaitingValidation from '../../../screens/admin/waiting-validation';
import MissionValidate from '../../../screens/admin/mission-validate';
import MissionRejected from '../../../screens/admin/mission-rejected';
import AdminProfile from '../../../screens/admin/admin-profile';
 
const Tab = createBottomTabNavigator()

const AdminNavigation = () => { 
    return(
        <Tab.Navigator tabBar={(props) => <TabBarHome {...props} />}>
            <Tab.Screen 
                name="Attente" 
                component={WaitingValidation}
                initialParams={{ icon: 'home'}}
            />
            <Tab.Screen 
                name="Validée"
                component={MissionValidate}
                initialParams={{ icon: 'user'}}
            />
            <Tab.Screen 
                name="Rejetée"
                component={MissionRejected}
                initialParams={{ icon: 'user'}}
            />
            <Tab.Screen 
                name="Profile"
                component={AdminProfile}
                initialParams={{ icon: 'user'}}
                options={{ title: "Prifilee"}}
            />
        </Tab.Navigator>
    )
}

export default AdminNavigation;