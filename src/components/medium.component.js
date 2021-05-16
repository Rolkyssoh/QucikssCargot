import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
 
const Medium = ({name, press}) => {
    console.log('navigation desn Medium : ', press)
    return(
        <TouchableOpacity style={styles.medium_container} onPress={press}>
            <Text>Icone ici</Text>
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    medium_container:{
        height:150,
        width:150,
        backgroundColor:'white',
        justifyContent:'space-around',
        alignItems:'center',
        margin:15
    }
})

export default Medium