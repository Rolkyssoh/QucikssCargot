import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import MissionItem from '../../components/mission-item';

const MissionValidate = ({ navigation }) => {
    // const doNavigate = (routeName) => {
    //     navigation.navigate(`${routeName}`)
    // }
    return(
        <View style={styles.validate_container}>
            <Text h3>Valider mission</Text>
            <View style={styles.items_list}>
                <MissionItem />
                <MissionItem />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    validate_container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#d5dde0'
    },
    items_list:{
        // backgroundColor:'red',
        paddingHorizontal:25,
        paddingVertical:10,
        width:'100%',
    }
})

export default MissionValidate