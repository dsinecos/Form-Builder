# Writing a FormBuilder
## Using React-Native, Nativebase, Redux-form and Redux-persist

This application renders basic form components from a JSON based form config file.

#### Libraries used
  - React-Native 
  - Nativebase (As the UI kit)
  - Redux-form (For integrating the form with redux store)
  - Redux-persist (To provide form data persistence across application restarts)

## Steps

1. #### Create the basic form components using Nativebase

Each component can have one of two modes - `edit` or `preview`. The mode of the component dictates whether it is enabled or disabled for input.

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

The RadioInput component will accept the following as props
  - `mode` - Indicates whether the component is to be rendered in preview mode or edit mode enabling/ disabling input accordingly
  - `onChange` - A callback which is invoked with the value of a radio button when it is selected
  - `value` - Provides the value of the currently active radio button (Overrides `default` prop when not null)
  - `name` - Name of the component against which the form data for this field would be stored
  - `label` - Label to be displayed to the user for the radio input field
  - `default` - Default value that will be pre-selected when the form is rendered
  - `fieldType` - This should be `RADIO` for rendering a radio input
  - `radioOptions` - This is an array of objects which will provide the label and value for each of the radio button
    - { `label`: <String>, `value`: <String | Number> }

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

`<Label>{this.props.label}</Label>` renders the label for the radio input using the props provided to the component.

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
  - `setBackgroundColorInPreview` - When the component is in preview mode, this function returns a different background color to highlight the selected radio button
  - `isPreviewMode` - Is used to check if the component is rendered in preview mode and accordingly disable input
  - `isRadioSelected` - Returns `true` if the current radio button is selected. This is used to render the current radio active
  - `onRadioSelect` - This method is invoked when a radio button is selected

`isPreviewMode`
```javascript
    isPreviewMode() {
        return this.props.mode === 'preview';
    }
```

`onRadioSelect`
This method checks if it has a callback function provided on `onChange` props and invokes it when a radio button is pressed
```javascript
    onRadioSelect(value) {

        const onChange = this.props.onChange;

        if (typeof onChange === 'function') {
            console.log("Inside if")
            onChange(value);
        }
    }
```

`isRadioSelected`
This method returns if the radio button is selected by comparing the value in the component state `selectedValue` against the value of the radio button
```javascript
class RadioInput extends Component {
    constructor() {
        super();
        this.state = { selectedValue: "" }
    }

    isRadioSelected(value) {
        return this.state.selectedValue === value;
    }
}
```

The component state `selectedValue` is expected to be updated via `value` props using the following component lifecycle hooks.

The following lifecycle method `componentWillMount` checks if `value` props has been provided and assigns it to the state `selectedValue`. If `value` is null, it checks if a `default` option has been provided and assigns it to the state `selectedValue`. If neither have been provided it sets the `selectedValue` state to an empty string.

```javascript
    componentWillMount() {
        this.setState({ selectedValue: this.props.value || this.props.default || "" });
    }
```

When a radio button is selected it invokes the `onRadioSelect` method which in turn invokes the `onChange` function provided as prop. 

It is expected that the value of the selected radio button will be passed back to the radio input component via the `value` prop. When `value` prop is updated, the method `componentDidUpdate` will be invoked. 

`componentDidUpdate` will compare the `value` in the prevProps and the `value` in the new props. If they are different, it will update the state `selectedValue` with the value in the new props.

When the state is updated, `componentDidUpdate` will be invoked again, but will result in no change because this time `value` in prevProps and props would be the same.

```javascript
    componentDidUpdate(prevProps) {

        const prevValue = prevProps.input.value;
        const currentValue = this.props.input.value;

        // This check is applied to avoid an infinite loop when component is updated
        if (currentValue !== prevValue) {
            this.setState({ selectedValue: currentValue });
        }
    }
```

2. #### Connect the form component to redux store via `redux-form`

3. #### Migrating from redux-persist@4.6.0 to redux-persist@5.x


