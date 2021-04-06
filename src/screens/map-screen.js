import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

const MapScreen = ({navigation}) => {
    return(
        <View style={styles.map_container}>
            <MapView
                // provider={PROVIDER_GOOGLE}
                style={{ height:'100%'}} 
              initialRegion={{
                latitude: 25.7215,
                longitude: 55.32,
                latitudeDelta: 0.09,
                longitudeDelta: 0.921,
              }}
            ></MapView>
            <View style={styles.forwar_items}>
                <TouchableOpacity
                    style={styles.close_button}
                    onPress={() => navigation.navigate('NavTab')}
                >
                    <AntDesign name="close" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{backgroundColor:'white',  
                    borderRadius:25}}
                    onPress={() => navigation.openDrawer()}
                >
                    <Entypo name="menu" size={30} />
                </TouchableOpacity>
                {/* </View> */}
            </View>
            <View style={styles.item_select}>
                <Text>Element du bas</Text>
                <Button 
                    title="Créer mission" 
                    type="clear"
                    onPress={() => navigation.navigate('Mission')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map_container:{
        flex:1,
        // alignItems:'center'
        // height:'100%'
    },
    forwar_items:{
        position:'absolute',
        width:'100%',
        padding:20,
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'red'
    },
    close_button: {
        backgroundColor:'white', 
        borderRadius:25
    },
    item_bouton:{
        // width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    item_select:{
        position:'absolute',
        bottom:10,
        width:'50%',
        height:'25%',
        // justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#eee'
    }
})

export default MapScreen