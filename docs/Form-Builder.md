The FormBuilder component is responsible for rendering the form using the form-template. The form-template provides the configuration of the form and its various fields as a JSON.

## Responsibilities of FormBuilder component

1. Store form data in redux store as the user modifies the form
2. Render a form using a form-template. A form template is the configuration of the form and its various fields provided as JSON
3. Handle the form submission when the user submits the form

## FormBuilder component implementation

**Libraries used**
   - `redux-form`

Create a file FormBuilder.js and add the following boilerplate code importing the required modules

```javascript
    import React, { Component } from 'react';
    import { View } from 'react-native';
    import { connect } from 'react-redux';
    import { Field, reduxForm } from 'redux-form';

    import {
        FormDivider,
        TextInputFH,
        TextareaInput,
        PickerInput,
        RadioInput,
        CheckboxInput,
        DatePickerInput,
        SwitchInput
    } from './FormComponents';

    class FormBuilder extends Component {
        
    }
```

## Store form data in redux store as the user modifies the form

The FormBuilder component will store the form data provided by the user in the redux store. It uses the `redux-form` library to link the fields to redux store.

It is important to define the structure of how the form data would be stored in redux. The default behavior when using `redux-form` is that the form data is stored against the `form` key

```javascript
    {
        form: {
            formName1: {
                fieldName1: "data",
                fieldName2: "data",
                fieldName3: "data"
            },
            formName2: {

            },
            formName3: {
                
            }
        }
    }
```

For each form that is linked via `redux-form` a key is provided, against which the data for that form is stored. In the above snippet, those keys are `formName1`, `formName2` and `formName3`.

FormBuilder needs to be able to store data for multiple forms for multiple users. The target state for storing data will look like this

```javascript
{
    form: {
        formID: {
            userID1: {

            },
            userID2: {

            },
            userID3: {

            }
        }
    }
}
```

To achieve the above nesting in redux store, we need to provide dynamic keys for the forms (using the formID and the userID) at runtime.

When wrapping a component with `reduxForm` we need to provide an object `{ form: String }` in the following form

```javascript
FormBuilder = reduxForm({
    form: 'form-name'
})(FormBuilder)
```
The property `form` is used to provide the key against which the form data will be stored in redux store. 

```javascript
    {
        form: {
            form-name: {

            }
        }
    }
```

But since we want to provide a dynamic form-name which will depend upon which form template is being rendered we invoke `reduxForm()` without any arguments.

```javascript
FormBuilder = reduxForm()(FormBuilder);
```

As per the documentation 

> All of these configuration options may be passed into reduxForm() at "design time" or passed in as props to your component at runtime

We will therefore provide the name of the form at runtime using props passed to `FormBuilder` component.

Next we will link the `FormBuilder` component to the redux-store

Linking to redux store using `connect`

```javascript
/**
 * The following function maps state from redux store to props for the component FormBuilder (wrapped by reduxForm)
 * @param {object} state 
 * @param {object} ownProps 
 * @return {object} 
 * @property {string} form This prop provides the dynamic name for the form which will be used by redux-form to store form data against that name
 */
const mapStateToProps = (state, ownProps) => {
    return {
        formTemplates: state.formTemplates,
        formData: state.form,
        form: `${ownProps.formID}.userID`
    }
}

export default FormBuilder = connect(mapStateToProps)(FormBuilder);
```

We are importing two pieces of state from redux-store as props
- `formTemplates` - Stores the JSON configuration for the different forms
- `formData` - Stores the form data as entered by the user

The third property is a prop `form` which provides the key against which the data for this form will be stored. We use a template literal to provide the key for `form`. This is done to allow data for multiple users to be stored. This results in the following structure in the redux-store when storing form-data 

```json
{
    "form": {
        "formID": {
            "userID1": {

            },
            "userID2": {

            },
            "userID3": {

            }
        }
    }
}
```

This will allow the `redux-form` reducer to store form data for multiple users.

## Render a form using form-template

Next we will setup the methods inside `FormBuilder` class to render a form from its JSON config

```javascript
render() {
        return (
            <View>
                {this.renderForm()}
            </View>
        )
    }
```

We keep the `render` method simple and shift the heavy-lifting to the `renderForm` function.

FormBuilder component expects a prop `formID` which it uses to fetch the form-template from redux store

Consider a component 'FormScreen' which renders the FormBuilder component

```javascript
    import React, { Component } from 'react';
    import { View } from 'react-native';
    import FormBuilder from './FormBuilder';

    class FormScreen extends Component {
        render() {
            return (
                <View>
                    <FormBuilder formID={"507f1f77bcf86cd799439011"}/>
                </View>

            )
        }
    }

    export default FormContainer;
```

FormBuilder component uses the method `getFormTemplate` to fetch the JSON for the given formID

```javascript
    /**
     * Extract the relevant form template from Redux store corresponding to the formID provided as props
     */
    getFormTemplate() {
        return this.props.formTemplates.filter((formTemplate) => {
            return (formTemplate.formID === this.props.formID);
        })
    }
```

To render the form from the JSON, FormBuilder invokes the `renderForm()` method

```javascript

    /**
     * The `renderForm` function 
     * 1. Fetches the form template from the redux-store based on the formID provided to the FormBuilder component as props
     * 2. Builds the JSX for each field in the form template using custom form components
     * 3. Links the fields to redux-store using the `Field` component provided by `redux-form`
     * @returns {Array<JSX>} Returns an array of JSX, each element representing the JSX for a form field
     */

    renderForm() {

        let formTemplate = this.getFormTemplate();
        const formFields = formTemplate[0].formFields;
        const formName = this.props.formID;

        return formFields
            .map(
                (formField) => {
                    const FIELD_TYPE = this.getComponentForField(formField.fieldType);
                    const fieldName = formField.name;
                    const fieldData = this.props.formData[formName] ? this.props.formData[formName].values ? this.props.formData[formName].values[fieldName] : "" : "";

                    return (
                        <Field
                            key={fieldName}
                            {...formField}
                            component={FIELD_TYPE}
                        />
                    )
                }
            )
    }
```

The `renderForm` method extracts the configuration for the form-fields from the form-template.

Example of a form-template
```javascript
    {
        formID: "testFormID",
        formFields: [
            {
                name: "question2",
                label: "Which of the following is the correct option",
                default: "",
                fieldType: "RADIO",
                radioOptions: [
                    {
                        label: "Option1",
                        value: "Option1"
                    },
                    {
                        label: "Option2",
                        value: "Option2"
                    },
                    {
                        label: "Option3",
                        value: "Option3"
                    },
                    {
                        label: "Option4",
                        value: "Option4"
                    }
                ]
            }
        ]
    }
```

The input component for each field is wrapped within a `<Field>` component. `Field` is provided by `redux-form` and links the individual form fields to redux store. 

We provide it the following props
- `key` - This is required to provide a unique reference as we are creating an array of JSX
- `component` - Custom component to render the form input

The remaining props are as provided in the form-template for that field.

The `getComponentForField` method is used to assign the right component for each field

```javascript
    /**
     * Returns the appropriate component for rendering the field
     * @param {String} fieldType 
     */
    getComponentForField(fieldType) {
        switch (fieldType) {
            case 'RADIO':
                return RadioInput;
            case 'CHECKBOX':
                return CheckboxInput;
            case 'TEXT':
                return TextInputFH;
            case 'TEXTAREA':
                return TextareaInput;
            case 'SWITCH':
                return SwitchInput;
            case 'PICKER':
                return PickerInput;
            case 'DATEPICKER':
                return DatePickerInput;
            case 'FORMDIVIDER':
                return FormDivider;
            default:
                return View;
        }
    }
```

