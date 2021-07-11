import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';
import MissionItem from '../mission-item';
import { customNavigate } from '../navigations/CustomNavigation';

const ExecutedMissionComponent = (props) => {
    const [executedMission, setExecutedMission] = useState([])
    const [theCarrierId, setTheCarrierId] = useState(props.userId)

    useEffect(() => {
        console.log('the carrier id in exec : ', props)
    },[])

    return(
        <>
            <CustomHeader customTitle={props.theHeaderTitle} />
                <View style={styles.carrier_exec_container}>
                    {
                        props.theDatas && props.theDatas.length<=0 &&
                        <View style={{ alignItems:'center',marginTop:100}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>{props.noMissionMessage}</Text>
                        </View>
                    }
                    <FlatList 
                        data={props.theDatas}
                        renderItem={({item}) => <MissionItem Executed item={item} /> }
                        keyExtractor={(item)=>item.id.toString()}                     
                    />
                </View>
                <Button 
                    title="Retour"
                    type="clear"
                    onPress={() => customNavigate('Missions') }
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black',}}
                />
        </>
    )
}

const styles = StyleSheet.create({
    carrier_exec_container:{
        flex:1,
        padding:15,
        backgroundColor:'#d5dde0',
        borderTopColor:'#42a3aa',
        borderTopWidth:1
    }
})

const mapStateToProps = (state) => {
    return{
        userId: state.UpdateUserInfos.userId,
    }
}

export default connect(mapStateToProps)(ExecutedMissionComponent)