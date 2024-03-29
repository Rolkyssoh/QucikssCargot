import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import CustomerMissionComponent from '../../../components/customer-mission.component';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const ValidateMissionScreen = props => {
  const [missionValidated, setMissionValidated] = useState();
  const [user_id, setUserId] = useState(props.userId);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      firestore()
        .collection('Mission')
        .where('activated', '==', true)
        // .where("started_at", "==", "")
        .where('user_id', '==', user_id)
        .get()
        .then(resp => {
          console.log('response getting mission: ', resp.docs.length);
          setMissionValidated(resp.docs);
        })
        .catch(error => {
          console.log('error while getting mission : ', error);
        });
    });
    return () => {
      unsubscribe;
    };
  }, [props.navigation]);

  return (
    <>
      <CustomHeader customTitle="Validée(s)" />
      <ScrollView>
        <View style={styles.container_validated}>
          {missionValidated &&
            missionValidated.map(item => {
              return (
                <CustomerMissionComponent
                  key={item.id.toString()}
                  missions={item}
                  isCustomer
                />
              );
            })}
        </View>
        {missionValidated && missionValidated.length <= 0 && (
          <View style={{alignItems: 'center', marginTop: 100}}>
            <Text style={{fontFamily: 'Nunito-Black'}}>
              Pas de mission valide pour le moment!
            </Text>
          </View>
        )}
        {/* {
                missionValidated.length ==0 &&
                <View style={{ alignItems:'center', marginTop:100}}>
                    <Text>Aucune mission trouvée</Text>
                </View>
            } */}
      </ScrollView>
      <View style={styles.view_button_style}>
        <IconArrow name="arrowleft" color="#42a3aa" size={30} />
        <Button
          title="Retour"
          type="clear"
          onPress={() => props.navigation.goBack()}
          titleStyle={{color: '#42a3aa', fontFamily: 'Nunito-Black'}}
        />
        <IconArrow name="arrowright" color="#42a3aa" size={30} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container_validated: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderTopColor: '#42a3aa',
    borderTopWidth: 1,
  },
  view_button_style: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = state => {
  return {
    userId: state.UpdateUserInfos.userId,
  };
};

export default connect(mapStateToProps)(ValidateMissionScreen);
