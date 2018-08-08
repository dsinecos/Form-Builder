import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Label,
    Icon,
    Picker,
} from 'native-base';

class PickerInput extends Component {
    render() {
        return (
            <View>
                <Label>Select your SIM here and see how long can we have the label</Label>
                <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholder={"Placeholder"}
                    enabled={true}
                    style={{ width: undefined }}
                    selectedValue={"key0"}
                >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                </Picker>

            </View>
        )
    }
}

export { PickerInput };