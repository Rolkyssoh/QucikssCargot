import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { phoneNumberChanged, handleSendCode } from '../../actions';


const LoginScreen = (props) => {

    const checkActivatedPhoneNumber = (phoneNum) => {
        firestore()
        .collection('Users')
        .where('userPhoneNumber', '==', phoneNum)
        .get()
        .then((result) => { 
            if(result.docs.length>0){
                if(result.docs[0]._data.activated==false){
                    console.log('not activated')
                    props.navigation.navigate('Awaiting')
                } else {
                    //Envoie du code
                    props.handleSendCode(phoneNum)
                }
            } else {
                //Envoie du code
                props.handleSendCode(phoneNum)
            }
        })
        .catch((error) => console.log('error while getting user by phone number', error))
    }

    const onPhoneNumberChange = (phone) => {
        props.phoneNumberChanged(phone)
    }

    const doLogin = () => {
        if(props.phone != ''){  
            checkActivatedPhoneNumber(props.phone)
            // props.handleSendCode(props.phone)
            console.log('do loggg: ', props.phone)
        } else {
            console.log('phone est vide')
        }
    }

    return(
        <View style={styles.login_container}>
            <Text style={{ fontSize:22, fontFamily:'Nunito-Black'}}>
                Entrez votre numéro de téléphone
            </Text> 
            <View style={styles.view_input}>
                <Text style={styles.text_style}>+212</Text>
                <Input 
                    placeholder="0643826612"
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"
                    value={props.phone} 
                    // maxLength={10}
                    onChangeText={(e)=> onPhoneNumberChange(e)}
                    // containerStyle={{backgroundColor:'red',flex:1}}
                    inputContainerStyle={{ marginHorizontal:35,}}
                    inputStyle={{fontFamily:'Nunito-Regular'}}
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
                    onPress={() => props.navigation.navigate('CarrierSignup')}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    containerStyle={{ top:20}}
                />
                { props.loading && 
                    <View style={{ alignItems:'center', top:150}}>
                        <ActivityIndicator size="large" color='black' />
                    </View> 
                }
            </View> 

            <View style={styles.button_view}> 
                <Text style={{ fontFamily:'Nunito-Regular'}}>
                    Si vous continuez, vous recevrez peut-être un SMS de vérification.
                    Des frais de messagerie SMS et de transfert de données peuvent s'appliquer.
                </Text>
                <Button
                    containerStyle={{width:'100%', paddingVertical:15,}}
                    // buttonStyle={{width:370 }}
                    title="Confirmer"
                    type="outline"
                    onPress={doLogin}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    buttonStyle={{ borderRadius:20, borderColor:'#42a3aa'}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    login_container:{
        flex:1,
        alignItems:'center',
        padding: 15,
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
        width:'85%'
        
    },
    text_style:{
        fontSize:18,
        top:9,
        left:40,
        fontFamily:'Nunito-Regular'
    }
})

const mapStateToProps = (state) => {
    return{
        phone: state.loginUsers.phone,
        loading: state.loginUsers.loading,
    }
}


export default connect(mapStateToProps, { phoneNumberChanged, handleSendCode})(LoginScreen)