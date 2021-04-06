import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';


const LoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    return(
        <View style={styles.login_container}>
            <Text h4>
                Entrez votre numéro de téléphone
            </Text>
            <View style={styles.view_input}>
                <Text style={styles.text_style}>+212</Text>
                <Input 
                    placeholder="0643826612"
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"
                    value={phoneNumber}
                    onChangeText={val => setPhoneNumber(val)}
                    // containerStyle={{backgroundColor:'red',flex:1}}
                    inputContainerStyle={{ marginHorizontal:35,}}
                    // inputStyle={{backgroundColor:'black'}}
                />
            </View>
            <View style={styles.view_text}>
                {/* <Text>Ou connectez-vous à l'aide d'un réseau social</Text> */}
                {/* <View>
                    <Text>Devenir transporteur</Text>
                </View> */}
                <Button 
                    title="Devenir transporteur"
                    type="clear"
                    onPress={() => navigation.navigate('CarrierSignup')}
                    containerStyle={{ top:20}}
                />
            </View>

            <View style={styles.button_view}>
                <Text>
                    Si vous continuez, vous recevrez peut-être un SMS de vérification.
                    Des frais de messagerie SMS et de transfert de données peuvent s'appliquer.
                </Text>
                <Button
                    containerStyle={{width:370, paddingVertical:15,}}
                    // buttonStyle={{width:370 }}
                    title="To Admin"
                    type="clear"
                    onPress={() => navigation.navigate('AdminNav')}
                />
                <Button
                    containerStyle={{width:370, paddingVertical:15,}}
                    // buttonStyle={{width:370 }}
                    title="To Home"
                    type="outline"
                    onPress={() => navigation.navigate('NavTab')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    login_container:{
        flex:1,
        alignItems:'center',
        // padding: 15,
    },
    view_input:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:20,
        top:25,
        // backgroundColor:'blue',
    },
    view_text: {
        top:135, 
        position:'absolute'
    },
    button_view:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'flex-end', 
        width:370 
    },
    text_style:{
        fontSize:18,
        top:9,
        left:40
    }
})

export default LoginScreen