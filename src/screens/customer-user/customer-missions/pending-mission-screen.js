import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import CustomerMissionComponent from '../../../components/customer-mission.component';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const PendingMissionScreen = (props) => {
    const [missionPending, setMissionPending] = useState()
    const [user_id, setUserId] = useState(props.userId)

    useEffect(() => { 
        console.log('valeu de user id : ', props.userId)
        // if(props.userId){
        //     setUserId(props.userId)
        // }
        firestore()
            .collection('Mission')
            .where("activated", "==", false) 
            .where("user_id", "==", user_id) 
            .get()
            .then((resp) => { 
                console.log('response getting mission: ', resp.docs)
                setMissionPending(resp.docs)
            })
            .catch((error) => { console.log('error while getting mission : ', error)})
    },[])

    return(
        <>
            <CustomHeader customTitle="En attente" />
            <ScrollView > 
                <View style={styles.container_pending}>
                    {
                        missionPending && missionPending.map((item) => { 
                            return <CustomerMissionComponent key={item.id.toString()} missions={item} isCustomer />
                        })
                    }
                    
                </View> 
                {/* {
                    missionPending.length ==0 &&
                    <View style={{ alignItems:'center', marginTop:100}}>
                        <Text>Aucune mission trouvée</Text>
                    </View>
                } */}
            </ScrollView>
            <View style={styles.view_button_style}>
                <View />
                <Button 
                    title="Retour"
                    type="clear"
                    onPress={() => props.navigation.navigate('NavTab')}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black',}}
                />
                <IconArrow name="arrowright" color='#42a3aa' size={30} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_pending:{
        flex:1, 
        flexWrap:'wrap',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        // backgroundColor: "#dee1e3",
        borderTopColor:'#42a3aa',
        borderTopWidth:1
    },
    view_button_style:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

const mapStateToProps = (state) => {
    return{
        userId: state.UpdateUserInfos.userId,
    }
}

export default connect(mapStateToProps)(PendingMissionScreen)