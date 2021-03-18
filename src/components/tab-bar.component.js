import React, {useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import Tab from './tab.component';

const {width} = Dimensions.get('screen')

const TabBar = ({state, navigation}) => {
    const [selected, setSelected] = useState('Home');
    const {routes} = state;
    const renderColor = (currentTab) => (currentTab === selected ? '#42a3aa': 'black');

    const handlePress = (activeTab, index) =>{
        if(state.index !== index){
            setSelected(activeTab);
            navigation.navigate(activeTab)
        }
    }

    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {
                    routes.map((route, index) => (
                        <Tab 
                            tab={route} 
                            icon={route.params.icon}
                            color={renderColor(route.name)}
                            onPress={() => handlePress(route.name, index)}
                            key={route.key} 
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    wrapper:{
        position:'absolute',
        bottom: 20,
        width,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:300,
        backgroundColor:'white',
        borderRadius:50
    }
})

export default TabBar