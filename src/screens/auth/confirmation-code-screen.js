import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { 
    digit1Changed,
    digit2Changed,
    digit3Changed,
    digit4Changed,
    digit5Changed,
    digit6Changed,
    confirmCode,
} from '../../actions';

const ConfirmationCode = (props) => {

    const onDigit1Change = (digit1) => {
        props.digit1Changed(digit1)
    }
    const onDigit2Change = (digit2) => {
        props.digit2Changed(digit2)
    }
    const onDigit3Change = (digit3) => {
        props.digit3Changed(digit3)
    }
    const onDigit4Change = (digit4) => {
        props.digit4Changed(digit4)
    }
    const onDigit5Change = (digit5) => {
        props.digit5Changed(digit5)
    }
    const onDigit6Change = (digit6) => {
        props.digit6Changed(digit6)
    }

    const doCheckCode = () => {
        const {digit1, digit2, digit3, digit4, digit5, digit6, receivedCode} = props;
        const enteredCode = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
        props.confirmCode({receivedCode,enteredCode})
    }

    return(
        <View style={styles.container_view}>
            <View style={styles.text_intro_view}>
                <Text>Saisissez le code à 6 chiffres reçu au numéro +212643826612</Text>
            </View>
            <View style={styles.inputs_style_view}>
                <Input
                    name='digit1'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit1}
                    onChangeText={(e1)=>onDigit1Change(e1)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
                <Input
                    name='digit2'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit2}
                    onChangeText={(e2)=>onDigit2Change(e2)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
                <Input
                    name='digit3'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit3}
                    onChangeText={(e3)=>onDigit3Change(e3)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
                <Input
                    name='digit4'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit4}
                    onChangeText={(e4)=>onDigit4Change(e4)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
                <Input
                    name='digit5'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit5}
                    onChangeText={(e5)=>onDigit5Change(e5)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
                <Input
                    name='digit6'
                    placeholder='0'
                    keyboardType="phone-pad"
                    value={props.digit6}
                    onChangeText={(e6)=>onDigit6Change(e6)}
                    maxLength={1}
                    inputStyle={{ paddingHorizontal: 10, }}
                    labelStyle={{ color: 'red', fontSize: 20, }}
                    containerStyle={{ width: 60, height: 60, padding: 5, }}
                    inputContainerStyle={styles.input_container_style}
                />
            </View>
            <View style={styles.error_view_style}>
                <Text style={{color:'red'}}>erreurs ici</Text>
            </View>
            <Button
                containerStyle={{alignSelf:'flex-start'}}
                // buttonStyle={{width:370 }}
                title="Renvoyer le code"
                type="clear"
                // onPress={doLogin}
            />
           
            <View style={styles.validation_button_view}>            
                <Button
                    // containerStyle={{alignSelf:'flex-end'}}
                    // buttonStyle={{width:370 }}
                    title="Suivant"
                    type="outline"
                    onPress={doCheckCode}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_view:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingBottom:20
    },
    text_intro_view:{
        marginBottom:30
    },
    inputs_style_view: {
        flexDirection:'row'
    },
    input_container_style:{
        marginTop: 5,
        borderBottomWidth:2,
        // borderBottomColor:{val = 1? 'blakc':'red'},
        borderBottomColor:'black',
        alignItems:'center', 
        justifyContent:'center' 
    },
    error_view_style: {
        marginVertical:15,
    },
    resend_view_style:{},
    validation_button_view:{
        flex:1,
        justifyContent:'flex-end',
        // alignItems:'flex-end'

    }
})

const mapStateToProps = (state) =>{
    return{
        receivedCode:state.loginUsers.receivedCode,
        digit1: state.confirmationCode.digit1,
        digit2: state.confirmationCode.digit2,
        digit3: state.confirmationCode.digit3,
        digit4: state.confirmationCode.digit4,
        digit5: state.confirmationCode.digit5,
        digit6: state.confirmationCode.digit6,
    }
}

export default connect(
    mapStateToProps,
    {
        digit1Changed,
        digit2Changed,
        digit3Changed,
        digit4Changed,
        digit5Changed,
        digit6Changed,
        confirmCode
    })(ConfirmationCode)