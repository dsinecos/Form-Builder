import React, { Component } from 'react';
import { View } from 'react-native';
import FormBuilder from './FormBuilder';

class FormScreen extends Component {
    render() {
        return (
            <View>
                <FormBuilder formID={"testFormID"}/>
            </View>

        )
    }
}

export default FormScreen;