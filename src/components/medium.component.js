import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { customNavigate } from './navigations/CustomNavigation';
 
const Medium = ({name}) => { 
 
    const doNavigation = (givenParam) => {
        customNavigate(
            'Drawer', {
                screen:'Map',
                params:{moyen: `${givenParam}`}
            }
        )
    }

    return(
        <View style={styles.medium_container}>
            {name == 'Petit Camion' && 
                <Image 
                    source={require('../../assets/images/ptit_camion.png')} 
                    onPress={()=> doNavigation('ptit_camion')} 
                    style={styles.image_style} 
                />
            }
            {name == 'Tricycle' && 
                <Image source={require('../../assets/images/tricycle.png')} 
                    onPress={()=> doNavigation('tricycle')}  
                    style={styles.image_style} 
                />
            }
            <Text>{name}</Text>
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
        width:130
    }
})

export default Medium