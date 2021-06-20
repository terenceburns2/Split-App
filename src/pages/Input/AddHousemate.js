import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function AddHousemate(props) {
    const [name, setName] = useState('');

    const changeHandler = (name) => {
        setName(name);
    }

    return (
        <View style={{width: '100%'}}>
            <TextInput
            placeholder="Enter housemate"
            style={{borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, width: '100%'}}
            onChangeText={changeHandler}
            onSubmitEditing={() => {
                if (name != "") {
                    props.onEnter(name); // Callback
                    setName("");
                }
            }}
            clearTextOnFocus={true}
            />
        </View>
    );
}