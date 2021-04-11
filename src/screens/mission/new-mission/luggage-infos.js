import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';
import CustomButton from '../../../components/custom-button';
import NewMissionHeader from '../../../components/new-mission-header';

const LuggageInfos = ({ navigation }) => {
    return(
        <View style={styles.luggage_infos_container}>
            <NewMissionHeader title="Détails du Bagage" />
            <View style={styles.content_view}>
                <View style={styles.input_view}>
                    <Input 
                        placeholder="Volume approximatif"
                    />
                    <Input 
                        placeholder="Nature Bagage"
                    />
                    {/* <Input 
                        placeholder="Ajouter images"
                    /> */}
                    <CustomButton 
                        customTitle="Ajouter images"
                        customPress={() => navigation.navigate("Images") }
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
        backgroundColor:'gray',
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

export default LuggageInfos