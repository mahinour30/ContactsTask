import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, PermissionsAndroid, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable,  } from 'react-native';
import Contacts from 'react-native-contacts';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/actions/actions';
import {connect} from 'react-redux';

const Home = ({navigation}, props) => {

    const [contacts, setContacts] = useState(null);
    const [selected, setSelected] = useState([]);
    const [target, setTarget] = useState('');
    const [flag , setFlag] = useState(false);
    const dispatch = useDispatch();

    const submitContact = (contact) => dispatch(addContact(contact))


    useEffect(() => {
        if (Platform.OS === 'ios') {
            Contacts.getAll((error, contacts) => {
                if (error) {
                    throw error;
                }
                setContacts(contacts)
            })
        } else if (Platform.OS === 'android') {
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

    const getSearch = e => {
        const filteredData = contacts.filter((contact) => {
            let contactLowerCase = (contact.givenName + '' + contact.familyName).toLowerCase();
            let searchTermLowerCase = e.toLowerCase();
            return contactLowerCase.indexOf(searchTermLowerCase) > -1
        });
        setContacts(filteredData)
        setTarget(e)
    }

    return (
        <SafeAreaView style={styles.Container}>
            <TouchableOpacity style={{height:20, left:-10, flexDirection:'row-reverse'}}
            
            onPress={()=> navigation.navigate('Favorites')}>
                
                    {(flag) ? <Text style={{...FONTS.h2, color:COLORS.secondary}}>Next</Text> : <Text style={{...FONTS.h2, color:COLORS.secondary}}>Favorites</Text> }
               
            </TouchableOpacity>

            <View style={{ backgroundColor: COLORS.primary }}>
                <Image
                    style={styles.Icon}
                    source={icons.Search}
                />
                <TextInput
                    placeholder='Search'
                    style={styles.Search}
                    onChangeText={(e) => getSearch(e)}
                />
            </View>

            {selected.length != 0 &&
                <FlatList
                    horizontal={true}
                    data={selected}
                    renderItem={(item) => (
                        
                        <View style={styles.selectContainer}>
                            {console.log('From Selected', item.item.img)}
                            {(item.item.hasThumbnail) ? <Image
                                style={styles.Img}
                                source={{ uri: item.item.img }}
                            /> :
                                <View style={styles.Circle}>
                                    <Image
                                        style={styles.Avatar}
                                        source={icons.Avatar}
                                    />
                                </View>}

                                
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("unselected==>", item.item)
                                    let temp = [...selected]
                                    temp.pop(item.item)
                                    setSelected(temp)
                                    
                                }}
                                style={styles.X}>
                                <View>
                                    <Image
                                        style={{ width: 15, height: 15 }}
                                        source={icons.X}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />
            }


            <View style={{ backgroundColor: COLORS.primary }}>
                <Text style={{...FONTS.h1, color:COLORS.white, marginLeft:10}}>
                    {target}
        </Text>
            </View>

            <FlatList
                data={contacts}
                renderItem={(item) => {
                return(
    
                    <View style={styles.boxContainer}>

                        {(item.item.hasThumbnail) ? <Image
                            style={styles.Img}
                            source={{ uri: item.item.thumbnailPath }}
                        /> :
                            <View style={styles.Circle}>
                                <Image
                                    style={styles.Avatar}
                                    source={icons.Avatar}
                                />
                            </View>}

                        <Text style={styles.Title}>
                            {item.item.displayName}
                        </Text>

                       <Pressable 
                       onPress={() => {
                        console.log("selected==>", item.item.displayName)
                        let temp = [...selected]
                        console.log("temp before", temp)
                        let data = {
                            name :item.item.displayName ,
                            id :item.item.recordID,
                            img : item.item.thumbnailPath,
                            selected:true,
                            hasThumbnail: item.item.hasThumbnail
                        }
                        temp.push(data)
                        console.log("temp after ", temp)
                        setSelected(temp)
                        setFlag(!flag)
                        submitContact(item.item.displayName, item.item.recordID,item.item.thumbnailPath)
                    }}
                    
                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? COLORS.secondary
                            : COLORS.primary
                        },
                        styles.Round
                      ]} 
                    >
                        <Image
                                        style={{width:15, height:15, tintColor:COLORS.black2}}
                                        source={icons.Done}
                                    />
                       </Pressable>


                        

                    </View>
                )}}
                numColumns={1}
                keyExtractor={(item, index) => index}
            />

                            { selected.map(value=>{
                                value
                            })}
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
      add :(contact) => dispatch(addContact(contact))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.black2
    },
    Circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
        backgroundColor: '#696969',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    Img: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },
    Avatar: {
        width: 52,
        height: 52,
        borderRadius: 50,
        marginTop: 17,
    },
    Title: {
        ...FONTS.h1,
        color: COLORS.white,
        marginTop: 10,
    },
    boxContainer: {
        backgroundColor: '#282828',
        margin: 0.3,
        flexDirection: 'row'
    },
    Search: {
        height: SIZES.height * 0.06,
        width: SIZES.width * 0.95,
        backgroundColor: COLORS.darkGrey,
        borderRadius: 15,
        alignSelf: 'center',
        margin: 10,
        color: COLORS.lightGrey,
        fontSize: 20,
        paddingStart: 30,
    },
    Icon: {
        width: 25,
        height: 25,
        borderRadius: 50,
        marginTop: 17,
        position: 'absolute',
        zIndex: 999,
        left: 12,
        tintColor: COLORS.lightGrey,
    },
    Round: {
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        position: 'absolute',
        top: 17,
        borderWidth: 1,
    },
    UNRound: {
        backgroundColor: 'blue',
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        position: 'absolute',
        top: 17,
        borderWidth: 1,
    },
    selectContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.black2,
        width: 65,
        height: 80,
        marginLeft: 10,
        justifyContent: 'center'
    },
    X: {
        backgroundColor: COLORS.darkGrey,
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 15,
        top: 2,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
    },
})