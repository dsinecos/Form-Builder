import React, { Component } from 'react';
import { View } from 'react-native';

import {
    List,
    Label,
    ListItem,
    CheckBox,
    Body,
    Text,
} from 'native-base';

class CheckboxInput extends Component {
    render() {
        return (
            <View>
                <List>
                    <Label>This is the label for the checkboxes</Label>
                    <ListItem>
                        <CheckBox />

                        <Body>
                            <Text>Daily Stand Up </Text>
                        </Body>
                    </ListItem>
                    <ListItem>
                        <CheckBox />


                        <Body>
                            <Text>Logistics support </Text>
                        </Body>
                    </ListItem>
                </List>

            </View>
        )
    }
}

export { CheckboxInput };