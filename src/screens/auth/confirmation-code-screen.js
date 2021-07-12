import React, { createRef, useRef } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
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
import CustomHeader from '../../components/custom-header';

const ConfirmationCode = (props) => {
    const inputDigit1 = useRef()
    const inputDigit2 = useRef()
    const inputDigit3 = useRef()
    const inputDigit4 = useRef()
    const inputDigit5 = useRef()
    const inputDigit6 = useRef()
    
    const onDigit1Change = (digit1) => {
        props.digit1Changed(digit1)
        if(digit1===''){}
        else{
            inputDigit2.current.focus()
        }
    }
    const onDigit2Change = (digit2) => {
        props.digit2Changed(digit2)
        if(digit2===''){inputDigit1.current.focus()}
        else{
            inputDigit3.current.focus()
        }
    }
    const onDigit3Change = (digit3) => {
        props.digit3Changed(digit3)
        if(digit3===''){inputDigit2.current.focus()}
        else{
            inputDigit4.current.focus()
        }
    }
    const onDigit4Change = (digit4) => {
        props.digit4Changed(digit4) 
        if(digit4===''){inputDigit3.current.focus()}
        else{
            inputDigit5.current.focus()
        }
    }
    const onDigit5Change = (digit5) => {
        props.digit5Changed(digit5)
        if(digit5===''){inputDigit4.current.focus()}
        else{
            inputDigit6.current.focus()
        }
    }
    const onDigit6Change = (digit6) => {
        props.digit6Changed(digit6)
        if(digit6===''){inputDigit5.current.focus()}
    }

    const doCheckCode = () => {
        const {digit1, digit2, digit3, digit4, digit5, digit6, receivedCode} = props;
        const enteredCode = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
        props.confirmCode({receivedCode,enteredCode}) 
    }

    return(
        // <CustomHeader customTitle="Rejetée(s)" />
        <View style={{flex:1}}>
            <CustomHeader customTitle="code de confirmation" />
            <View style={styles.container_view}>
                <View style={styles.text_intro_view}>
                    <Text style={{ fontFamily:'Nunito-Regular'}}>Saisissez le code à 6 chiffres reçu au numéro {props.phone}</Text>
                </View>
                <View style={styles.inputs_style_view}>
                    <Input
                        name='digit1'
                        ref={inputDigit1}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit1}
                        onChangeText={(e1)=>onDigit1Change(e1)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                    <Input
                        name='digit2'
                        ref={inputDigit2}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit2}
                        onChangeText={(e2)=>onDigit2Change(e2)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                    <Input
                        name='digit3'
                        ref={inputDigit3}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit3}
                        onChangeText={(e3)=>onDigit3Change(e3)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                    <Input
                        name='digit4'
                        ref={inputDigit4}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit4} 
                        onChangeText={(e4)=>onDigit4Change(e4)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                    <Input
                        name='digit5'
                        ref={inputDigit5}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit5}
                        onChangeText={(e5)=>onDigit5Change(e5)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                    <Input
                        name='digit6'
                        ref={inputDigit6}
                        placeholder='0'
                        keyboardType="phone-pad"
                        value={props.digit6}
                        onChangeText={(e6)=>onDigit6Change(e6)}
                        maxLength={1}
                        inputStyle={styles.inputs_styles}
                        labelStyle={{ color: 'red', fontSize: 20, }}
                        containerStyle={{ width: 60, height: 60, padding: 5, }}
                        inputContainerStyle={[styles.input_container_style, { borderBottomColor:`${ props.displayError ? 'red':'black'}`}]}
                    />
                </View>
                {/* display the error */}
                <View style={styles.error_view_style}>
                    <Text style={{color:'red'}}>{props.displayError}</Text>
                </View>
                <Button
                    containerStyle={{alignSelf:'flex-start'}}
                    // buttonStyle={{width:370 }}
                    title="Renvoyer le code"
                    type="clear"
                    titleStyle={{color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    // onPress={doLogin}
                />
                {props.loading && 
                    <View style={{ alignItems:'center', top:150 }}>
                        <ActivityIndicator size="large" color='black' />
                    </View>
                }
                <View style={styles.validation_button_view}>            
                    <Button
                        // containerStyle={{alignSelf:'flex-end'}}
                        // buttonStyle={{width:370 }}
                        title="Suivant"
                        type="outline"
                        onPress={doCheckCode}
                        buttonStyle={{ borderRadius:20, borderColor:'#42a3aa',}}
                        titleStyle={{color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_view:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        paddingHorizontal:20,
        paddingBottom:20
    },
    text_intro_view:{
        marginBottom:30
    },
    inputs_style_view: {
        flexDirection:'row'
    },
    inputs_styles:{
        fontFamily:'Nunito-Regular',
        paddingHorizontal: 10,
    },
    input_container_style:{
        marginTop: 5,
        borderBottomWidth:2,
        // borderBottomColor:`${props.displayError ? 'red':'black'}`,
        // borderBottomColor:'black',
        alignItems:'center', 
        justifyContent:'center' 
    },
    error_view_style: {
        marginVertical:10,
        paddingHorizontal:10,
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
        phone: state.loginUsers.phone,
        receivedCode:state.loginUsers.receivedCode,
        digit1: state.confirmationCode.digit1,
        digit2: state.confirmationCode.digit2,
        digit3: state.confirmationCode.digit3,
        digit4: state.confirmationCode.digit4,
        digit5: state.confirmationCode.digit5,
        digit6: state.confirmationCode.digit6,
        displayError: state.confirmationCode.displayError,
        loading: state.confirmationCode.loading,
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