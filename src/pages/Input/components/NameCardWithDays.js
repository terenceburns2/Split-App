import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux';
import { setUserDays } from '../../../actions/actions';

// Component that displays the name and a input field that allows the user to
// provide how many days each housemate was present within the bill period.
const NameCardWithDays = (props) => {
    if (props.splitOption == true) {
        return (
            <View style={styles.item}>
                <Text>{props.item.name}</Text>
                <NumericInput
                    editable={false}
                    totalWidth={100}
                    onChange={(value) => { props.setUserDays(props.item.key, value) }}
                    maxValue={props.durationOfBill + 1}
                    minValue={0}
                    value={props.item.days}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.inactiveItem}>
                <Text>{props.item.name}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
    },
    inactiveItem: {
        alignItems: 'flex-start',
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
        splitOption: state.splitOption,
        durationOfBill: state.durationOfBill
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserDays: (key, days) => dispatch(setUserDays(key, days))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NameCardWithDays);