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

/**
 *  Dummy variable to simulate props recieved as param when this screen is loaded.
 *  To be replaced by `this.props.param.formID`
 */
// const FormIDFromParam = "testFormID";

/**
 * Renders various form fields from JSON
 */
class FormBuilder extends Component {

    /**
     * Extract the relevant form template from Redux store corresponding to the formID provided as param in the props
     */
    getFormTemplateFromParam() {
        return this.props.formTemplates.filter((formTemplate) => {
            return (formTemplate.formID === this.props.formID);
        })
    }

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

    /**
     * The `renderForm` function 
     * 1. Fetches the form template from the redux-store based on the formTemplateID param provided to the FormBuilder component as props
     * 2. Builds the JSX for each field in the form template using custom form components
     * 3. Links the fields to redux-store using the `Field` component provided by `redux-form`
     * @returns {Array<JSX>} Returns an array of JSX, each element representing the JSX for a form field
     */

    renderForm() {

        let formTemplate = this.getFormTemplateFromParam();
        const formFields = formTemplate[0].formFields;

        return formFields
            .map(
                (formField) => {
                    const FIELD_TYPE = this.getComponentForField(formField.fieldType);
                    const fieldName = formField.name;

                    return (
                        <Field
                            key={fieldName}
                            {...formField}
                            component={FIELD_TYPE}
                            value={"Option3"}
                        />
                    )
                }
            )
    }

    render() {
        return (
            <View>
                {this.renderForm()}
            </View>
        )
    }
}

FormBuilder = reduxForm()(FormBuilder);

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