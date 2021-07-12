import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text,Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const WelcomeScreen = ({navigation}) => {
    return( 
        <View style={styles.container_welcome}>
            <View>
                <Text style={{ fontFamily:'Nunito-Black', fontSize:33}}>Quicksse</Text>
            </View>
            <Image source={require('../../assets/images/logo.png')} style={{ width:115, height:300,}} />
            <View style={styles.view_text_style}>
                <Text style={styles.text_style}>Se déplacer en sécurité avec ses bagages</Text>
            </View> 
            <Button 
                titleStyle={{ paddingHorizontal:10, color:'#42a3aa', fontFamily:'Nunito-Black'}}
                buttonStyle={{ borderRadius:20, borderColor:'#42a3aa',}} 
                title="Commencer" 
                type="outline"
                onPress={() => navigation.navigate('Login')}
                icon={
                    <FontAwesome5 name="arrow-right" size={20} color='#42a3aa' />
                }
                iconRight
                // containerStyle={{ justifyContent:'flex-end'}}
             />
        </View> 
    )
}

const styles = StyleSheet.create({
    container_welcome:{
        flex:1,
        // justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:40,
        paddingTop:66
    },
    view_text_style:{
        alignItems:'center',
        flex:1
    },
    text_style: {
        fontSize:20,
        fontFamily:'Nunito-Black'
    }
})

export default WelcomeScreen