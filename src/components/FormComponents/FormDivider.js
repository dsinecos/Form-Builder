import React, { Component } from 'react';
import { } from 'react-native';
import { List, ListItem, Text } from 'native-base';

class FormDivider extends Component {
    render() {
        return (
            <List>
                <ListItem itemDivider>
                    <Text>{this.props.label}</Text>
                </ListItem>
            </List>
        )
    }
}

export { FormDivider };