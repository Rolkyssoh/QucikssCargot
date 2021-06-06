import React, { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { customNavigate } from "./navigations/CustomNavigation";

const CustomModalComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

    const confirmDeleted = () => {
        const date = new Date()
        const theDate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
        const theHours = date.getHours()+":"+date.getMinutes();
        console.log('suppression confirmée!')
        //   setModalVisible(!modalVisible)
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
            <Text style={styles.modalText}>{props.modalText}</Text>
            <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                <Pressable  onPress={confirmDeleted}>
                    <Text style={styles.textStyle}>Oui</Text>
                </Pressable>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Non</Text>
                </Pressable>
            </View>
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
    padding: 35,
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
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
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
    textAlign: "center"
  }
});

export default CustomModalComponent;