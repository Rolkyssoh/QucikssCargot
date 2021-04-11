import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';

const RejectionReason = ({navigation}) => {
    return(
        <View style={styles.rejection_container}>
             <CustomHeader customTitle="Raison" />
            <View style={styles.textarea_view}>
                <Input 
                    multiline = {true}
                    numberOfLines={10}
                    placeholder="Quelle est la raison du rejet?"
                    inputContainerStyle={styles.input_container_style}
                />
            </View>
            <View style={styles.buttons_view}>
                <Button 
                    title="Annuler"
                    type="outline"
                    onPress={()=>navigation.navigate('Details')}
                    buttonStyle={styles.button_styles}
                    titleStyle={styles.button_text_styles}
                />
                 <Button 
                    title="Valider"
                    type="outline"
                    buttonStyle={styles.button_styles}
                    titleStyle={styles.button_text_styles}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rejection_container:{
        flex:1,
        backgroundColor:'#d5dde0'
    },
    textarea_view:{
        flex:2,
        padding:10,
        justifyContent:'center'
    },
    input_container_style:{
        backgroundColor:'grey', 
        borderColor:'#014248', 
        borderWidth:2, padding:10
    },
    buttons_view:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    button_styles:{
        width:150,
        borderColor:'#014248',
        borderWidth:5,
        borderRadius:15
    },
    button_text_styles:{
        color:'#014248'
    }
})

export default RejectionReason