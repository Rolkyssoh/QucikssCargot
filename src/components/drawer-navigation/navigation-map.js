import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from '../../screens/map-screen';
import CustomDrawerContent from '../custom-drawer-content';

const Drawer = createDrawerNavigator()

const NavigationDrawerMap = () => {
    return(
        <Drawer.Navigator
            drawerPosition='right'
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="Map" 
                component={MapScreen} 
                options={{ headerShown:false }}
            />
        </Drawer.Navigator>
    )
}

export default NavigationDrawerMap