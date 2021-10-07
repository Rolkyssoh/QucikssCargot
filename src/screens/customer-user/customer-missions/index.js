import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import PendingMissionScreen from './pending-mission-screen';
import ValidateMissionScreen from './validated-mission-screen';
import RejectedMissionScreen from './rejected-mission-screen';
import MaterialTabBar from '../../../components/navigations/material-tab.component';
import DoneMissionScreen from './done-mission-screen';

const MissionTab = createMaterialTopTabNavigator();

const CustomerMissions = () => {
  return (
    <MissionTab.Navigator
      tabBar={props => <MaterialTabBar {...props} />}
      tabBarPosition="bottom">
      <MissionTab.Screen name="En attente" component={PendingMissionScreen} />
      <MissionTab.Screen name="Validée" component={ValidateMissionScreen} />
      <MissionTab.Screen name="Rejetée" component={RejectedMissionScreen} />
      <MissionTab.Screen name="Effectué" component={DoneMissionScreen} />
    </MissionTab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default CustomerMissions;
