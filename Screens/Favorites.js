import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Platform, StyleSheet, PermissionsAndroid, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/actions/actions';
import {connect} from 'react-redux';


const Favorites =({navigation}, props)=>{


  const dispatch = useDispatch();

  const deleteCurrent = (key) => dispatch(deleteContact(key))

  const contacts = useSelector(state => state.contactReducer.contactList)


  return(
    <SafeAreaView style={styles.Container}>
        <TouchableOpacity style={{height:20}}
            
            onPress={()=> navigation.navigate('Home')}>
                
                    <Text style={{...FONTS.h2, color:COLORS.secondary}}>Back</Text> 
               
            </TouchableOpacity>


            <FlatList
             data={contacts}
             keyExtractor={(item, index) => item.key}
              renderItem={
               (data) =>
               <View  style={styles.listContainer}>
               
               <Text style={styles.Title}>
                 {data.item.name}
               </Text>
             
               <TouchableOpacity  
               onPress={()=>{selectionHandler(index)}}
               style={styles.Round}>
                 <View>
                                     <Image
                                     style={{ width: 15, height: 15, tintColor: COLORS.black }}
                                     source={icons.Done}
                                 />
                            
               </View>
     
                </TouchableOpacity>
                </View>




      }
    />
    </SafeAreaView>

  )
}

const mapStateToProps = (state) =>{
  return{
    contacts : state.contactReducer.contactList
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    delete :(key) => dispatch(deleteContact(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles=StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor: COLORS.black2
  },
  Title:{
    ...FONTS.h1, 
    color:COLORS.white, 
    marginTop:10,
    marginLeft:20
  },
  Icon:{
    width:25, 
    height:25, 
    borderRadius:50, 
    marginTop:17,
    position:'absolute',
    zIndex:999,
    left:12,
    tintColor:COLORS.lightGrey,
  },
  Round:{
    backgroundColor:COLORS.secondary,
    width:25,
    height:25,
    borderRadius:20,
    justifyContent:'center', 
    alignItems:'center',
    right:30, 
    position:'absolute', 
    top:17, 
    borderWidth:1,
  },
  listContainer:{
    borderWidth:1,
    borderColor:COLORS.lightGrey, 
    flexDirection:'row',
    padding:10
  }
})