import React from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DisplayImage from '../../../components/display-image';
import NewMissionHeader from '../../../components/new-mission-header';
// import Ionicons from 'react-native-vector-icons/Ionicons'
 
const LuggageImages = ({navigation}) => {
    return(
        <View style={styles.luggage_image_contaier}>
            <NewMissionHeader title="Images du Bagage" doNav={()=>navigation.navigate('Bagage') } />
            <View style={styles.view_content}>
                <View style={styles.icon_view}>
                    <Text>Vous pouvez ajouter jusqu'à 4 images</Text>
                </View> 
                <View style={styles.dislay_image_view} >  
                    <View style={styles.image_view}>
                        <DisplayImage imgOne />
                        <DisplayImage img2 />
                    </View>
                    <View style={styles.image_view}>
                        <DisplayImage img3 />
                        <DisplayImage img4 />
                    </View>
                </View>
                {/* <View style={{ flex:2 }} /> */}
            </View>
            <View style={{ flex:2, justifyContent:'center', alignItems:'center' }}>
                <Button 
                    title="Valider"
                    type='outline'
                    onPress={()=>navigation.navigate('Bagage') }
                />
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    luggage_image_contaier:{
        flex:1,
        backgroundColor:'#fff'
    },
    view_content:{
        flex:5,
    },
    icon_view:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    dislay_image_view:{
        // backgroundColor:'red',
        flex:3,
        flexDirection:'row',
        borderColor:'grey',
        borderWidth:0.3
    },
    image_view:{
        // backgroundColor:'green',
        flex:1,
    },
})

export default LuggageImages