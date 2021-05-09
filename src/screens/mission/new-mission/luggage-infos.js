import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';
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

    return(
        <View style={styles.luggage_infos_container}>
            <NewMissionHeader title="Détails du Bagage" doNav={()=>props.navigation.navigate('Drawer')} />
            <View style={styles.content_view}>
                <View style={styles.input_view}>
                    <Input 
                        placeholder="Volume approximatif"
                        value={props.luggageVolume}
                        onChangeText={onVolumeChange}
                    />
                    <Input  
                        placeholder="Nature Bagage"
                        value={props.baggageType}
                        onChangeText={onBaggageTypeChange}
                    />
                    {/* <Input 
                        placeholder="Ajouter images"
                    /> */}
                    <CustomButton 
                        customTitle="Ajouter images"
                        customPress={() => props.navigation.navigate("ImgLuggage") }
                    />
                </View>
                <View style={styles.text_view}>
                    <Text>
                        Conseil: Les missions avec images sont le plus vue
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