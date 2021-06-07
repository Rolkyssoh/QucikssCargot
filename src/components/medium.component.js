import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { customNavigate } from './navigations/CustomNavigation';
 
const Medium = ({name}) => { 
 
    const doNavigation = (givenParam) => {
        // customNavigate(
        //     'Drawer', {
        //         screen:'Map',
        //         params:{moyen: `${givenParam}`}
        //     }
        // )
        customNavigate(
            'ManageMission', {
                screen:'Mission',
                params: {moyen: `${givenParam}`}
            }
        )
    }

    return(
        <View style={styles.medium_container}>
            {name == 'Camionnette' && 
                <Image 
                    source={require('../../assets/images/ptit_camion.png')} 
                    onPress={()=> doNavigation('camionnette')} 
                    style={styles.image_style} 
                />
            }
            {name == 'Tricycle' && 
                <Image source={require('../../assets/images/tricycle.png')} 
                    onPress={()=> doNavigation('tricycle')}  
                    style={styles.image_style} 
                />
            }
            <Text style={{ fontFamily:'Nunito-Black'}}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    medium_container:{
        height:150, 
        width:150,
        backgroundColor:'white',
        justifyContent:'space-around',
        alignItems:'center',
        margin:15,
        borderRadius:20
    },
    image_style:{
        height:100, 
        width:130,
        // backgroundColor:'#e3e2e7'
    }
})

export default Medium