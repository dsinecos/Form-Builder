import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Item,
    Label,
    Input
} from 'native-base';

class TextInputFH extends Component {
    render() {
        return (
            <View>
                <Item stackedLabel>
                    <Label>{this.props.label}</Label>
                    <Input defaultValue={this.props.defaultValue} placeholder={this.props.placeholder}/>
                </Item>
            </View>
        )
    }
}

export { TextInputFH };