import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';

const MissionDetails = ({navigation}) => {
    return(
        <View style={styles.container_details}>
            <CustomHeader customTitle="Details" />
            <View style={styles.slider_view}>
                <Text>Slider ici</Text>
            </View>
            <View style={styles.description_view}>
                <Text>Description ici</Text>
            </View>
            <View style={styles.button_view}>
                <CustomButton 
                    customTitle="Retour"
                    customPress={() =>navigation.navigate("AdminNav")}
                />
                <CustomButton 
                    customTitle="Valider" 
                    customPress={() => navigation.navigate('Map')}
                />
                <CustomButton 
                    customTitle="Rejeter" 
                    customPress={() => navigation.navigate('Rejection')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_details:{
        flex:1,
        backgroundColor:'#d5dde0',
    },
    slider_view:{
        flex:6,
    },
    description_view:{
        flex:5,
        // backgroundColor:'green'
        padding:20
    },
    button_view:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#d5dde0',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        borderColor:'grey',
        borderTopWidth:3
        // paddingBottom:10
    }
})

export default MissionDetails