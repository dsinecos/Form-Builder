import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Label,
    List,
    ListItem,
    Radio,
    Left,
    Body,
    Right,
    Text
} from 'native-base';

// The following component is tightly coupled to Redux-form as it uses the props provided on `input` ~ this.props.input.onChange

class RadioInput extends Component {

    constructor() {
        super();
        this.state = { selectedValue: "" }
    }

    componentWillMount() {
        console.log("Props given to radio input");
        console.log(this.props);
        console.log("Value ", this.props.value);
        console.log("Default ", this.props.default);

        this.setState({ selectedValue: this.props.input.value || this.props.default || "" });
    }

    /**
     * Updates the selected radio using props provided by the parent component in this.props.value
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
        console.log("Component did update");

        const prevValue = prevProps.input.value;
        const currentValue = this.props.input.value;

        // This check is applied to avoid getting into an infinite loop when component is updated
        if (currentValue !== prevValue) {
            this.setState({ selectedValue: currentValue });
        }
    }

    onRadioSelect(value) {
        // Call the onChange function provided on this.props.input
        console.log("Radio selected with value ", value);

        const onChange = this.props.input ? this.props.input.onChange : null;
        if (typeof onChange === 'function') {
            console.log("Inside if")
            onChange(value);
        }
    }

    /**
     * Check if the component is in 'edit' mode or 'preview' mode
     */
    isPreviewMode() {
        return this.props.mode === 'preview';
    }

    isRadioSelected(value) {
        return this.state.selectedValue === value;
    }

    setBackgroundColorInPreview(value) {
        if (this.isPreviewMode() && this.isRadioSelected(value)) {
            return {
                backgroundColor: '#cbeda6'
            }
        }

        return {
            backgroundColor: 'transparent'
        }
    }

    /**
     * Render JSX for multiple radio buttons
     */
    renderRadio() {
        const radioOptions = this.props.radioOptions;

        return radioOptions.map(({ value, label }) => {
            return (

                <ListItem
                    key={value}
                    style={this.setBackgroundColorInPreview(value)}
                    onPress={this.onRadioSelect.bind(this, value)} >

                    <Radio
                        disabled={this.isPreviewMode()}
                        selected={this.isRadioSelected(value)} />

                    <Body>
                        <Text>{label}</Text>
                    </Body>

                </ListItem>

            )
        })
    }

    render() {
        return (
            <View>
                <List>

                    <Label>{this.props.label}</Label>

                    {this.renderRadio()}
                </List>
            </View>
        )
    }
}

export { RadioInput };