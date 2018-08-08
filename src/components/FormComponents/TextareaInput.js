import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Form,
    Label,
    Textarea
} from 'native-base';

class TextareaInput extends Component {
    render() {
        return (
            <Form>
                <Label>{this.props.label}</Label>
                <Textarea rowSpan={5} bordered />
            </Form>
        )
    }
}

export { TextareaInput };