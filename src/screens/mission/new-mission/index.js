import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import MissionInfos from './mission-infos';
import LuggageInfos from './luggage-infos';
import LuggageImages from './luggage-images';

const MissionTab =createMaterialTopTabNavigator()

const NewMission = () => {
    return(
        <MissionTab.Navigator
            tabBarPosition='bottom'
        >
            <MissionTab.Screen 
                name="Mission"
                component={MissionInfos}
            />
            <MissionTab.Screen
                name="Bagage"
                component={LuggageInfos}
            />
            <MissionTab.Screen 
                name="Images"
                component={LuggageImages}
            />
        </MissionTab.Navigator>
    )
}

const styles = StyleSheet.create({})

export default NewMission