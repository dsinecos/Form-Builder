import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Label,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Text,
    Switch,
    Form
} from 'native-base';

class SwitchInput extends Component {
    render() {
        return (
            <View>
                <List>
                    <ListItem>
                        {/* <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon name="help" />
                            </Button>
                        </Left> */}
                        <Left>
                            <Label>{this.props.label}</Label>
                        </Left>
                        <Right>
                            <Switch />
                        </Right>
                    </ListItem>
                </List>
            </View>
        )
    }
}

export { SwitchInput };