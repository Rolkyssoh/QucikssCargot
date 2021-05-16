import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';
import { updatedName, updatedEmail, updatedCity, updateInfosUser } from '../../actions';

const AddInfosScreen = (props) => { 

    useEffect(() => {
        console.log('current user dans add infos : ', auth().currentUser._user.uid)
        // if(auth().currentUser){
        //     props.userIdChanged(auth().currentUser._user.uid)
        // }
        firestore()
            .collection('Users')
            .where("userPhoneNumber", "==", auth().currentUser._user.phoneNumber) 
            .get()
            .then((infosUser) => {
            console.log('user informations : ', infosUser.docs);
        })
        .catch((error) =>{ console.log('erreur lors de recherche par numéro: ', error)})
    },[])
 
    const onUpdateName = (name) =>{
        props.updatedName(name)
    }
    const onUpdateEmail = (email) => {
        props.updatedEmail(email)
    }
    const onUpdateCity = (city) => {
        props.updatedCity(city)
    }

    const doUpdate = () => {
        const { userId, name, email, city } = props
        props.updateInfosUser({ userId, name, email, city })
    }

    return(
        <View style={styles.container_add_infos}>
            <CustomHeader customTitle="Bienvenue" />
            <View style={styles.subtitle_style_view}>
                <Text h4>Completez vos informations</Text>
            </View>
            <View style={styles.view_input_style}>
                <Input
                    placeholder="Entrez votre nom"
                    value={props.name}
                    onChangeText={onUpdateName}
                />
                <Input
                    placeholder="Entrez votre e-mail"
                    value={props.email}
                    onChangeText={onUpdateEmail}
                />
                <Input
                    placeholder="Numéro de téléphone"
                    value={auth().currentUser._user.phoneNumber}
                    disabled
                />
                <Input
                    placeholder="Entrez votre ville"
                    value={props.city}
                    onChangeText={onUpdateCity}
                />
            </View>
            <View style={styles.view_button_style}>
                <Button 
                    title="Valider"
                    type="outline"
                    onPress={doUpdate}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_add_infos:{
        flex:1,
        // padding:20
    },
    subtitle_style_view:{
        alignItems:'center',
        paddingTop:50,
        paddingBottom:30
    },
    view_input_style:{
        paddingHorizontal:20
    },
    view_button_style:{
        alignItems:'center',
        paddingTop:100
    }
})

const mapStateToProps = (state) => {
    return{
        userId: state.UpdateUserInfos.userId,
        name: state.UpdateUserInfos.name,
        email: state.UpdateUserInfos.email,
        city: state.UpdateUserInfos.city,
    }
}

export default connect(mapStateToProps, { updatedName, updatedEmail, updatedCity, updateInfosUser})(AddInfosScreen)