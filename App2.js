import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/components/navigations/stack-navigation';

const Drawer = createDrawerNavigator();

const App2 = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="NavStack">
                <Drawer.Screen name="NavStack" component={StackNav} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default App2