import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Label,
    DatePicker,
    Text
} from 'native-base';

class DatePickerInput extends Component {
    render() {
        return (
            <View>
                <Label>How long can the label for the ddate picker be when I'm using nativebase</Label>
                <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#888" }}
                    // onDateChange={this.setDate}
                    style={{ width: 200 }}
                />
                <Text>
                    Date: {"Dummy Value"}
                </Text>
            </View>
        )
    }
}

export { DatePickerInput };