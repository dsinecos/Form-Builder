import React, { Component } from 'react';
import { View } from 'react-native';
import EditForm from './EditForm';

class FormContainer extends Component {
    render() {
        return (
            <View>
                <EditForm dummyProp={"formNameFromParam"} />
            </View>

        )
    }
}

export default FormContainer;