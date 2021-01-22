import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Platform, StyleSheet, PermissionsAndroid, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import Contacts from 'react-native-contacts';
import {COLORS, FONTS, SIZES, icons} from '../constants';


const Favorites =()=>{

  const [contacts, setContacts]= useState(null);

  useEffect(() => {
    if(Platform.OS === 'ios'){
      Contacts.getAll((error, contacts) => {
        if(error){
          throw error;
        }
        setContacts(contacts)
      })
    } else if(Platform.OS === 'android'){
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll()
    .then((contacts) => {
      setContacts(contacts);
    })
    .catch((e) => { console.log(e); })
    })
  }
  }, []);




  return(
    <SafeAreaView style={styles.Container}>
      <View style={{backgroundColor:COLORS.primary}}>
        <Text>
          =====================
        </Text>
      </View>
      <FlatList
      data = {contacts}
      renderItem = {({item}) => (
        <View style={styles.boxContainer}>
          {(item.hasThumbnail) ?<Image
          style={styles.Img}
          source={{uri: item.thumbnailPath}}
          /> :
          <View style={styles.Circle}>
            <Image
            style={styles.Avatar}
            source={icons.Avatar}
            />
          </View> }
          <Text style={styles.Title}>
            {item.givenName} 
          </Text>
          <Text> </Text>
          <Text style={styles.Title}>
            {item.familyName} 
          </Text>
          <TouchableOpacity  style={styles.Round}>
            <View>
            <Image
            style={{width:15, height:15, tintColor:COLORS.black}}
            source={icons.Done}
            />
          </View>
           </TouchableOpacity>
        </View>
      )}
      numColumns = {1}
      keyExtractor = {(item, index) => index}
      />
    </SafeAreaView>

  )
}

export default Favorites;

const styles=StyleSheet.create({
  Container:{
    flex:1
  },
  Circle:{
    width:50, 
    height:50, 
    borderRadius:25, 
    margin:5, 
    backgroundColor:'#696969', 
    justifyContent:'center', 
    alignItems:'center', 
    overflow:'hidden',
  },
  Img:{
    width:50, 
    height:50, 
    borderRadius:25,
    margin:5,
  },
  Avatar:{
    width:52, 
    height:52, 
    borderRadius:50, 
    marginTop:17,
  },
  Title:{
    ...FONTS.h1, 
    color:COLORS.white, 
    marginTop:10,
  },
  boxContainer:{
    backgroundColor:'#282828', 
    margin:0.3, 
    flexDirection:'row'
  },
  Search:{
    height: SIZES.height*0.06,
    width:SIZES.width*0.95, 
    backgroundColor: COLORS.darkGrey, 
    borderRadius:15,
    alignSelf:'center', 
    margin:10, 
    color:COLORS.lightGrey,
    fontSize:20,
    paddingStart:30,
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
  selectContainer:{
    flexDirection:'row', 
    backgroundColor:COLORS.black2,
    width:65, 
    height:80, 
    justifyContent:'center'
  },
  X:{
    backgroundColor:COLORS.darkGrey,
    width:20,
    height:20,
    borderRadius:20,
    justifyContent:'center', 
    alignItems:'center',
    right:65, 
    position:'absolute', 
    top:2, 
    borderWidth:1,
    borderColor:COLORS.lightGrey
  },
})