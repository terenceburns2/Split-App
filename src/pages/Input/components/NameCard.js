import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { removeHousemate } from '../../../actions/actions.js';

// Component for displaying the name for within the NameModal.
const NameCard = (props) => {
    return (
        <TouchableOpacity onLongPress={() => props.remove(props.item.key)} delayLongPress={800}>
            <Text style={styles.item}>{props.item.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
    }
});

const mapStateToProps = (state) => {
    return {
      housemates: state.housemates
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      remove: (key) => dispatch(removeHousemate(key))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NameCard);