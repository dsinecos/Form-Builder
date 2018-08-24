## Creating Form Input components
A form input component refers to a field in the form. Different components provide options for different kinds of input - text, radio, checkbox, picker etc.

Each component can be rendered in one of two modes - `edit` or `preview`. The mode of the component dictates whether it is enabled or disabled for input.

The following code snippet demonstrates creating a Radio input component using the radio component provided by Nativebase.

Create a file RadioInput.js

Boilerplate code importing the required modules for `RadioInput`

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

import {
    Label,
    List,
    ListItem,
    Radio,
    Body,
    Text
} from 'native-base';

class RadioInput extends Component {

}

export { RadioInput }
```

*Because of integration with `redux-form` (covered in the next section), the `value` and `onChange` props will be received as `input.value` and `input.onChange`. The following code thus uses `this.props.input.value` for `this.props.value` and `this.props.input.onChange` for `this.props.onChange`.*

The RadioInput component will accept the following as props
  - `mode` - Indicates whether the component is to be rendered in preview mode or edit mode enabling/ disabling input accordingly
  - `onChange` - A callback which is invoked with the value against a radio button when it is selected
  - `value` - Provides the value of the currently active radio button (Overrides `default` prop when not null)
  - `name` - Identifier for this field and the key which the form data for this field would be stored
  - `label` - Label to be displayed to the user for the radio input field
  - `default` - Default value that will be pre-selected when the form is rendered
  - `radioOptions` - This is an array of objects which will provide the label and value for each of the radio button. Each object is composed of two keys
    -   `label`: <String>, To be displayed to the user for the respective radio button 
    -   `value`: <String | Number> }, Value to be stored for the radio button

Add the `render()` method for the radio input component 

```javascript
class RadioInput extends Component {
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
```

`<Label>{this.props.label}</Label>` renders the label for the radio input using the `label` props provided to the component.

`this.renderRadio()` is defined to render an array of radio buttons.

```javascript
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
```

`renderRadio` returns an array composed of JSX for each of the radio buttons. The function uses the data provided in the `radioOptions` props.

The `renderRadio` uses the following methods
  - `isRadioSelected` - Returns `true` if the current radio button is selected
  - `onRadioSelect` - This method is invoked when a radio button is selected
  - `isPreviewMode` - Is used to check if the component is rendered in preview mode and accordingly disable input
  - `setBackgroundColorInPreview` - When the component is in preview mode, this function returns a different background color to highlight the selected radio button

`isRadioSelected`
This method returns if the radio button is selected. It checks this by comparing the value in the props `this.props.input.value` or `this.props.default` against the value of the radio button

```javascript
    isRadioSelected(value) {
        const selectedValue = this.props.input.value || this.props.default || "";
        return selectedValue === value;
    }
```

`onRadioSelect`
This method checks if it has a callback function provided on `input.onChange` props and invokes it when a radio button is pressed.

When a radio button is selected, the `onChange` callback (provided in the props `this.props.input.onChange`) is invoked with the value of the selected radio button as an argument. It is expected that the parent component will update the `value` props provided to RadioInput component. This will update the RadioInput component to activate the recently selected radio button

```javascript
    onRadioSelect(value) {
        const onChange = this.props.input ? this.props.input.onChange : null;

        if (typeof onChange === 'function') {
            onChange(value);
        }
    }
```

`isPreviewMode`
This method checks whether to render the component in 'edit' mode or 'preview' mode using the `mode` props provided.

```javascript
    isPreviewMode() {
        return this.props.mode === 'preview';
    }
```

`setBackgroundColorInPreview`
This method highlights the selected radio button in the 'preview' mode.

```javascript
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
```