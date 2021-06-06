import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import CustomButton from '../../../components/custom-button';
import NewMissionHeader from '../../../components/new-mission-header';
import { volumeChanged, baggageTypeChanged} from '../../../actions';

const LuggageInfos = (props) => {

    const onVolumeChange = (luggageVolume) => {
        props.volumeChanged(luggageVolume) 
    }
    const onBaggageTypeChange = (baggageType) => { 
        props.baggageTypeChanged(baggageType)
    }

    const clearInputFields = () => {
        props.volumeChanged('');
        props.baggageTypeChanged('');
        props.navigation.navigate('Home')
    }

    return(
        <View style={styles.luggage_infos_container}>
            <NewMissionHeader title="Détails du Bagage" doNav={clearInputFields} />
            <View style={styles.content_view}>
                <View style={styles.input_view}>
                    <Input  
                        placeholder="Volume approximatif"
                        value={props.luggageVolume}
                        onChangeText={onVolumeChange}
                        inputStyle={styles.inputs_styles}
                    />
                    <Input  
                        placeholder="Nature Bagage"
                        value={props.baggageType}
                        onChangeText={onBaggageTypeChange} 
                    />
                    {/* <Input 
                        placeholder="Ajouter images"
                    /> */}
                    <Button 
                        title="Ajouter images"
                        type="clear"
                        onPress={() => props.navigation.navigate("ImgLuggage") }
                        titleStyle={{ color:'#42a3aa',fontFamily:'Nunito-Black'}}
                    /> 
                </View>
                <View style={styles.text_view}> 
                    <Text style={{ fontFamily:'Nunito-Black' }}>
                        Conseil: Les missions avec images attirent plus l'attention
                    </Text>
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    luggage_infos_container:{
        flex:1,
        backgroundColor:'#fff',
    },
    content_view:{
        flex:5,
        // backgroundColor:'gray',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    input_view:{
        flex:3
    },
    inputs_styles:{
        fontFamily:'Nunito-Regular'
    },
    text_view:{
        flex:2
    }
})

const mapStateToProps = (state) => {
    return {
        luggageVolume: state.NewMission.luggageVolume,
        baggageType: state.NewMission.baggageType
    }
}

export default connect(mapStateToProps,{volumeChanged, baggageTypeChanged})(LuggageInfos)