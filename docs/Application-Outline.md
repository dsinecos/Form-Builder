# Form-Builder

This is an experimental application to render dynamic forms using a form-template defined as JSON.

![Form-Builder](/assets/cover-image.png)

## Design/ Architecture

1. ### Components to render individual form-fields

   Custom components derived from NativeBase's form components are used to provide various types of form input. 

   For certain inputs, such as text, textarea the wrapping is minimal. However for other inputs such as radio, checkbox, the wrapper component is needed to give the ability to render multiple options and activate the currently selected option. 

2. ### Component to render form UI from its JSON config

   FormBuilder component is used to render a form using the form-template. Form-template is the configuration of the form provided as JSON. For example, the following JSON renders a radio button with multiple options

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

   FormBuilder connects to redux to store the form data as the user modifies the form. FormBuilder is also responsible for handling the form submission.


3. ### Store form data in redux store

   `redux-form` is used to connect the form fields to the redux store. 
   
   The implementation involves wrapping the FormBuilder component using `reduxForm()` function and the individual form fields using the `Field` component provided by `redux-form`


4. ### Persist form data in local storage

   `redux-persist` is used to persist form data. The implementation involves 
   - Connecting redux store to `AsyncStorage` provided by `react-native` 
   - Ensuring the rendering of the form components is delayed until the form data is fetched from `AsyncStorage` when initializing the application
