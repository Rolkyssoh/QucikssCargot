import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';

const MissionDetailComponent = ({navigation,route}) => {

    useEffect(() => {
        console.log('params recue: ', route.params.infos)
    },[])

    return(
        <View style={styles.container_details}> 
            <CustomHeader customTitle="Details" />
            {route.params.infos && 
                <View style={styles.slider_view}>
                    <View style={{ flex:3, borderColor:'blue', borderWidth:2}}>
                        <Text>Slider ici</Text>
                    </View>
                    <View style={{ padding:10, flex:1, justifyContent:'center' }}>
                        <Text h4>Titre</Text>
                    </View>
                </View>
            }
            {route.params.infos && 
                <View style={styles.description_view}>
                    <Text>{route.params.infos.mission_description}</Text>
                    <Text>Départ : {route.params.infos.depature_place} </Text>
                    <Text>Destination : { route.params.infos.mission_destination}</Text>
                </View>
            }
                {/* For Admin */}
            {   route.params.isAdmin &&
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
            }
                {/* For carrier */}
            {   route.params.isCarrier &&
                <View style={styles.button_view}>
                    <CustomButton 
                        customTitle="Retour"
                        customPress={() =>navigation.navigate("CarrierNav")}
                    /> 
                    <CustomButton 
                        customTitle="Intéressé" 
                        customPress={() => navigation.navigate('Rejection')}
                    />
                </View>
            }
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
        borderColor:'red',
        borderWidth:1
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

export default MissionDetailComponent