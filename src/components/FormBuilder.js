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
            return (formTemplate.formID === this.props.formIDFromParam);
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

    renderForm() {

        let formTemplate = this.getFormTemplateFromParam();
        console.log("Form template");
        console.log(formTemplate);
        const formFields = formTemplate[0].formFields;
        console.log("Form fields");
        console.log(formFields);

        const formName = this.props.dummyProp;
        console.log("Name from redux-form ", this.props.form);

        return formFields
            .map(
                (formField) => {
                    const FIELD_TYPE = this.getComponentForField(formField.fieldType);
                    const fieldName = formField.name;
                    // Get field data from redux store
                    const fieldData = this.props.formData[formName] ? this.props.formData[formName].values ? this.props.formData[formName].values[fieldName] : "" : "";
                    console.log("Field data ", fieldData);

                    // console.log("Printing out redux store prop value");
                    // console.log(this.props.formData[formName].values[fieldName]);
                    // console.log("Field Data");
                    // console.log(fieldData);

                    return (
                        <Field
                            key={fieldName}
                            {...formField}
                            component={FIELD_TYPE}
                            value={"Option3"}
                        />
                    )
                })
    }

    render() {
        console.log("This is the formName ", this.props.dummyProp);
        console.log("This is the formData ");
        console.log(this.props.formData[this.props.dummyProp]);

        console.log(this.props.formData[this.props.dummyProp] ? this.props.formData[this.props.dummyProp].values ? this.props.formData[this.props.dummyProp].values.testRadio : "Nothing" : "Nothing");

        return (
            <View>
                {this.renderForm()}
            </View>
        )
    }
}

// FormBuilder = reduxForm({
//     form: "testForm"
// })(FormBuilder);

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
        form: `${ownProps.dummyProp}.ID` // Replace by ownProps.param.formID
    }
}

export default FormBuilder = connect(mapStateToProps)(FormBuilder);