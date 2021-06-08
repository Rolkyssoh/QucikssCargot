import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from "react-native";
import { customNavigate } from "./navigations/CustomNavigation";
import { Input } from 'react-native-elements';

const CustomModalComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [givenProposition, setGivenProposition] = useState('');
  const [changingModalText, setChangingModalText] = useState(props.modalText)
  const [doLoading, setDoLoading] = useState(false)

  useEffect(() => {
    console.log('valeur du current user: ', props.carrierId)
  },[])

    const confirmDeleted = () => {
        const date = new Date()
        const theDate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
        const theHours = date.getHours()+":"+date.getMinutes();
        console.log('suppression confirmée!')
        //   setModalVisible(!modalVisible)
        if(props.missionId){
          firestore()
            .collection('Mission')
            .doc(props.missionId)
            .update({
                isDeleted:true,
                activated:false,
                deletedDate: theDate,
                deletedHours: theHours
            })
            .then(() => {
              console.log('Mission deleted!');
              customNavigate('Customer')
            });
        }
    }

    const doSendProposition = () => {
      const date = new Date()
      const offerDate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
      const offerHour = date.getHours()+":"+date.getMinutes();
      console.log({givenProposition})
      if(givenProposition !==''){
        setDoLoading(true)
        firestore()
          .collection('Offer')
          .add({
            offer_date:offerDate,
            offer_hour:offerHour,
            offer_content: givenProposition,
            mission_id:props.missionId,
            carrier_id:props.carrierId
          })
          .then((result) => {
            setDoLoading(false)
            console.log('New proposition added: ', result)
            // setModalVisible(!modalVisible)
            setGivenProposition('')
            setChangingModalText('Votre proposition a bien été envoyé!')
          })
          .catch((error) => {
            setDoLoading(false)
            console.log('error while adding new propostion:', error)
          })
      }
    }

    const doCancel = () => {
      // setGivenProposition('')
      setChangingModalText('Entrez votre proposition')
      setModalVisible(!modalVisible)
    }
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredModalView}>
          <View style={styles.modalView}>
            <Text 
              style={[styles.modalText, {color:changingModalText=='Votre proposition a bien été envoyé!'? 'green':'black'}]}>
                {changingModalText}
              </Text>
            { props.forDelete &&
              <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                  <Pressable  onPress={confirmDeleted}>
                      <Text style={styles.textStyle}>Oui</Text>
                  </Pressable>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Non</Text>
                  </Pressable>
              </View>
            }
            { props.forProposition &&
              <View>
                  <Input
                    value={givenProposition}
                    onChangeText={(text) => setGivenProposition(text)}
                    multiline={true}
                    numberOfLines={4}
                    inputStyle={{ fontFamily:'Nunito-Regular'}}
                    inputContainerStyle={styles.input_container_style}
                  />
                <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                    <Pressable  onPress={doCancel}>
                        <Text style={styles.textStyle}>Annuler</Text>
                    </Pressable>
                    <Pressable onPress={doSendProposition}>
                        { !doLoading && <Text style={styles.textStyle}>Envoyer</Text> }
                        { doLoading && <ActivityIndicator size='small' color='#42a3aa'/> }
                    </Pressable>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{props.pressableTitle}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3", 
  },
  textStyle: {
    color: "#42a3aa",
    // fontWeight: "bold",
    fontSize:16,
    textAlign: "center",
    fontFamily:'Nunito-Black'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:'Nunito-Black',
  },
  input_container_style:{
    backgroundColor:'#e3e2e7', 
    borderColor:'#014248', 
    borderWidth:0.5, 
    paddingHorizontal:5,
    width:300,
    borderRadius:5
},
});

const mapStateToProps = (state) => {
  return{
    carrierId: state.UpdateUserInfos.userId
  }
}

export default connect(mapStateToProps)(CustomModalComponent);