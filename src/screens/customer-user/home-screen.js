import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet } from 'react-native';
import { Text,Button } from 'react-native-elements'
import Medium from '../../components/medium.component';


const HomeScreen = (props) => {
    // const [user, setUser]=useState();

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged((user)=>{
    //         if(user){
    //             console.log('Dans le home screen le user est:', user._user)
    //             // props.authStateChanged(user._user)
    //             setUser(user)
    //         }
    //         if(!user){
    //             props.navigation.navigate('Login')
    //         }
    //     });
    //     return subscriber
    // },[])

    return(
        <View style={styles.home_container}>
            <View style={styles.view_title}>
                <Text style={{ color:'#42a3aa'}} h2>Quicksse</Text>
            </View>
            <View style={styles.boxes_first_view}> 
                <View style={styles.boxes_second_view}> 
                    <Medium name="Petit Camion" />
                    <Medium name="Tricycle" />
                </View> 
                {/* <View style={styles.boxes_thirt_view}> */}
                    <Button 
                        title="Mes missions" 
                        type="outline"
                        onPress={() => props.navigation.navigate('Customer')}
                        titleStyle={{ color:'black', fontStyle:'normal', fontWeight:'bold',zIndex:-1 }}
                        buttonStyle={{ borderRadius:20}}
                        containerStyle={styles.boxes_thirt_view}
                    />
                {/* </View> */} 
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: "#dee1e3",
        flex:1,
        // justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#d5dde0'
    },
    view_title:{
        marginTop:30,
        marginBottom:120
    },
    boxes_first_view:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'yellow',
        width:'100%',
    }, 
    boxes_second_view:{
        flexDirection:'row',
        // justifyContent:'space-around',
        shadowRadius:1,
        shadowOpacity:1,
        shadowColor:'red',
        shadowOffset:{height:10, width:10},
        // backgroundColor:'red'
    },
    boxes_thirt_view:{ 
        // padding:10, 
        // marginHorizontal:40,
        marginTop:100,
        marginVertical:50,  
        backgroundColor:'#42a3aa',  
        // backgroundColor:'#42a3aa',
        // height:80, 
        width:300,
        justifyContent:'center' ,
        borderRadius:20,
        opacity:0.4
        
    }
});

export default HomeScreen