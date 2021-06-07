import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements'; 
import DisplayImage from '../../../components/display-image';
import NewMissionHeader from '../../../components/new-mission-header';
import { 
    baggageImage1Changed, 
    baggageImage2Changed, 
    baggageImage3Changed, 
    baggageImage4Changed,
} from '../../../actions';
 
const LuggageImages = (props) => {

    const leaveScreen = () => {
        props.baggageImage1Changed('') 
        props.baggageImage2Changed('') 
        props.baggageImage3Changed('') 
        props.baggageImage4Changed('')
        props.navigation.navigate('Bagage')
    }

    return(
        <View style={styles.luggage_image_contaier}>
            <NewMissionHeader title="Images du Bagage" doNav={leaveScreen} />
            <View style={styles.view_content}>
                <View style={styles.icon_view}>
                    <Text style={{ fontFamily:'Nunito-Black' }}>Vous pouvez ajouter jusqu'à 4 images</Text>
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
            </View>
            <View style={{ flex:2, justifyContent:'center', marginHorizontal:50}}>
                <Button 
                    title="Valider"
                    type='outline'
                    onPress={()=>
                        props.navigation.navigate( 
                            'Mission'
                        ) 
                    }
                    titleStyle={{ color:'#42a3aa',fontFamily:'Nunito-Black'}}
                    buttonStyle={{ borderRadius:20, borderColor:'#42a3aa',}}
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
        flex:3,
        flexDirection:'row',
        borderColor:'#e3e2e7',
        borderWidth:0.3
    },
    image_view:{
        flex:1,
    },
})

export default connect(null, {
    baggageImage1Changed, 
    baggageImage2Changed, 
    baggageImage3Changed, 
    baggageImage4Changed,
})(LuggageImages)