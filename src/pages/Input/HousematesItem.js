import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function HousematesItem(props) {
    return (
        <TouchableOpacity onLongPress={() => props.pressHandler(props.item.key)} delayLongPress={800}>
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