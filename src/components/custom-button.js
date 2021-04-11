import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text , Button} from 'react-native-elements';

const CustomButton = ({customTitle, customPress}) => {
    return(
        <Button 
            title={customTitle} 
            type="clear"
            onPress={customPress}
        />
    )
}

const styles = StyleSheet.create({})

export default CustomButton