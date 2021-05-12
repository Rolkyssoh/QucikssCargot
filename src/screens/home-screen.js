import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements'; 
import Medium from '../components/medium.component';
import { authStateChanged } from '../actions';


const HomeScreen = (props) => {
    const [user, setUser]=useState();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user)=>{
            if(user){
                console.log('Dans le home screen le user est:', user._user)
                props.authStateChanged(user._user)
                setUser(user)
            }
            if(!user){
                props.navigation.navigate('Login')
            }
        });
        return subscriber
    },[])

    return(
        <View style={styles.home_container}>
            <View style={styles.view_title}>
                <Text h2>Quickss</Text>
            </View>
            <View style={styles.boxes_first_view}>
                <View style={styles.boxes_second_view}>
                    <Medium name="Petit Camion" press={() => props.navigation.navigate('Drawer')} />
                    <Medium name="Tricycle" press={() => props.navigation.navigate('Drawer')}  />
                </View>
            </View>
            {/* <Button 
                title="Go to Map" 
                type="outline"
                onPress={() => props.navigation.navigate('Map')}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: "#dee1e3",
        flex:1,
        // justifyContent:'space-around',
        alignItems:'center'
    },
    view_title:{
        top:10,
        marginBottom:100
    },
    boxes_first_view:{
        // flex:1,
        justifyContent:'center',
        // backgroundColor:'yellow',
        width:'100%'
    },
    boxes_second_view:{
        flexDirection:'row',
        justifyContent:'space-around',
        shadowRadius:1,
        shadowOpacity:1,
        shadowColor:'red',
        shadowOffset:{height:10, width:10}
    }
});

export default connect(null,{authStateChanged})(HomeScreen)