import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import SwitchTab from './switch-tab.component';

const MaterialTabBar = ({state, navigation}) => {
    const [selected, setSelected] = useState('CarrierInfos')
    console.log('Dans le material tab custom : ', state);
    const {routes} = state;

    const handlePress = (activeTab, index) =>{
        console.log('index val :', index, activeTab)
        if(state.index !== index){
            setSelected(activeTab);
            navigation.navigate(activeTab)
        }
    } 

    return(
        <View style={styles.wrapper_view}>
            <View style={styles.container_view}>
                {/* {
                    routes && routes.map((route, index) => (
                        <SwitchTab 
                            tabSlip={route}
                            onPress={() => handlePress(route.name, index)}
                            indx={index}
                            key={route.key}
                        />
                    ))
                } */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper_view:{
        backgroundColor:'yellow',
        // position:'absolute',
        width:'100%',
        bottom: 20,
        alignItems:'center'
    },
    container_view:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:'80%',
        backgroundColor:'red'
    }
})

export default MaterialTabBar