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
                <Text style={{ color:'#42a3aa', fontFamily:'Nunito-Black', fontSize:35}}>Quicksse</Text>
            </View>
            <View style={styles.boxes_first_view}>
                <Text style={{ fontFamily:'Nunito-Black', fontSize:22}}>Choisissez le vehicule qui correspond à votre mission</Text>
                <View style={styles.boxes_second_view}> 
                    <Medium name="Camionnette" />
                    <Medium name="Tricycle" />
                </View>
                <View style={{ borderWidth:0.5, borderColor:'white', width:'100%', marginVertical:40}} />
                <Button 
                    title="Mes missions" 
                    type="outline"
                    onPress={() => props.navigation.navigate('Customer')}
                    titleStyle={{ color:'black',fontFamily:'Nunito-Black', fontSize:20 }}
                    buttonStyle={{ borderRadius:20}}
                    containerStyle={styles.boxes_thirt_view}
                />
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: "#dee1e3",
        flex:1,
        alignItems:'center',
        backgroundColor:'#d5dde0'
    },
    view_title:{
        marginTop:30,
        marginBottom:50
    },
    boxes_first_view:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    }, 
    boxes_second_view:{
        flexDirection:'row',
        shadowRadius:1,
        shadowOpacity:1,
        shadowColor:'red',
        shadowOffset:{height:10, width:10}, 
    },
    boxes_thirt_view:{ 
        marginTop:'3%',
        // marginVertical:50,  
        backgroundColor:'#42a3aa',  
        width:300,
        justifyContent:'center' ,
        borderRadius:20,
        opacity:0.4
        
    }
});

export default HomeScreen