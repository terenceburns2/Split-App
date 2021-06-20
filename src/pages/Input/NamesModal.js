import React, {useState} from 'react';
import {View, Text, Modal, Pressable, StyleSheet, Dimensions, TextInput} from 'react-native'
import { FontAwesome, Feather} from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import HousematesItem from './HousematesItem.js';
import AddHousemate from './AddHousemate.js';

const NameModal = () => {
    const [nameModal, setNameModal] = useState(false);
    const [housemates, setNames] = useState([
      {key: '1', name: 'Hold me down to delete'}
    ]);

    const pressHandler = (key) => {
      setNames((prevNames) => {
        return prevNames.filter(name => name.key != key);
      });
    }

    const enterHandler = (text) => {
      setNames((prevNames) => {
        return [
          { key: Math.random().toString(), name: text }, // Might need to alter this 
          ...prevNames
        ];
      });
    }

    return (
      <>
      <Modal
      animationType="fade"
      transparent={true}
      visible={nameModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setNameModal(!nameModal);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Housemates</Text>
          <AddHousemate onEnter={enterHandler}/>
          <FlatList style={{width: '100%', height: '60%'}}
            data = {housemates}
            renderItem = {({item}) => (
              <HousematesItem item={item} pressHandler={pressHandler}/>
            )}
          />
          <View style={{flex:1, justifyContent:'flex-end'}}>
            <Pressable
              onPress={() => setNameModal(!nameModal)}
            >
              <Feather name="check-circle" size={40} color="green" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
    <Pressable
      style={[styles.sectionButton, styles.housemates]}
      onPress={() => setNameModal(true)}
    >
      <Text style={styles.textStyle}>Housemates</Text>
      <FontAwesome name="users" size={40} color="white"/>
    </Pressable>
    </>
    );
  }

  const styles = StyleSheet.create({
    home: {
      backgroundColor: '#f26419',
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    housemates: {
      backgroundColor: '#DE6449',
    },  
    input: {
      alignItems: 'stretch',
      justifyContent: 'center',
      height: Dimensions.get('window').height,
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      height: '61%',
      width: '85%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily: "Avenir Next", 
      fontSize: 20
    },
    sectionButton: {
      height: 200,
      borderRadius: 20,
      elevation: 2,
      backgroundColor: '#eb8634',
      fontFamily: "Avenir Next",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      shadowColor: 'black',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 3
    },   
    textStyle: {
      color: "white",
      fontFamily: "Avenir Next",
      textAlign: "center",
      fontSize: 20,
      padding: 5
    },
   
  });

  export default NameModal;