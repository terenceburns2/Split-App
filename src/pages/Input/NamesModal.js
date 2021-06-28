import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Dimensions, TextInput } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import NameCard from './components/NameCard.js';
import { connect } from 'react-redux';
import { addHousemate } from '../../actions/actions.js';

const NameModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.list}>
              <Text style={styles.modalTitle}>Housemates</Text>
              <View style={{ width: '100%' }}>
                <TextInput
                  placeholder="Enter housemate"
                  style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, width: '100%' }}
                  onChangeText={(name) => setName(name)}
                  onSubmitEditing={() => {
                    if (name != "") {
                      props.add(name); // action
                      setName("");
                    }
                  }}
                  clearTextOnFocus={true}
                />
              </View>
              <FlatList style={{ width: '100%', height: '60%', marginVertical: 5 }}
                data={props.housemates}
                renderItem={({ item }) => (
                  <NameCard item={item} />
                )}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Feather name="check-circle" size={40} color="green" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.sectionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Housemates</Text>
        <FontAwesome name="users" size={40} color="white" />
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
  input: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  list: {
    width: '100%'
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
    flex: 1,
    marginVertical: 15,
    borderRadius: 20,
    elevation: 2,
    fontFamily: "Avenir Next",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#F46672'
  },
  textStyle: {
    color: "white",
    fontFamily: "Avenir Next",
    textAlign: "center",
    fontSize: 20,
    padding: 5
  },

});

const mapStateToProps = (state) => {
  return {
    housemates: state.housemates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name) => dispatch(addHousemate(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameModal);