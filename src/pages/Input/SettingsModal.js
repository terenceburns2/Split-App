import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

  const SettingsModal = () => {
    const [settingsModal, setSettingsModal] = useState(false);
    
    return (
    <>
       <Modal
          animationType="fade"
          transparent={true}
          visible={settingsModal}
          onRequestClose={() => {
            setSettingsModal(!settingsModal);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Split Options</Text>
              <Pressable
                style={[styles.sectionButton, styles.buttonClose]}
                onPress={() => setSettingsModal(!settingsModal)}
              >
              <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.sectionButton, styles.settings]}
          onPress={() => setSettingsModal(true)}
        >
        <Text style={styles.textStyle}>Split Options</Text>
        <MaterialCommunityIcons name="cog-outline" size={50} color="white" style={{paddingLeft: 25}}/>
        </Pressable>
    </>
    );
  }
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    modalContent: {
      height: '60%',
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
      textAlign: "center"
    },
    settings: {
      backgroundColor: '#BC96E6',
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

  export default SettingsModal;