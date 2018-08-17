import React, { Component } from 'react';
import { View } from 'react-native';
import FormBuilder from './FormBuilder';

class FormContainer extends Component {
    render() {
        return (
            <View>
                <FormBuilder dummyProp={"FormID"} formIDFromParam={"testFormID"}/>
            </View>

        )
    }
}

export default FormContainer;