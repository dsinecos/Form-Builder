## Implementation

### Components to render individual form-fields

1. **Libraries used**
   - NativeBase

2. **JSON Config to represent a Radio input**

    ```
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
    ```

3. **Implementation**
   
   *Because of integration with `redux-form` (covered in the next section), the `value` and `onChange` props will be received as `input.value` and `input.onChange`. The following code thus uses `this.props.input.value` for `this.props.value` and `this.props.input.onChange` for `this.props.onChange`.*

   - What are the different modes for a component to render in?
   - How to render Radio input?
     - How is the currently selected radio stored in state?
     - How is the array of radio options rendered?
   - What happens when a radio is selected? (Read about React component lifecycle)
     - How the currently selected radio stored in state is not updated directly?
     - How the `onChange` function provided as props is invoked?
     - How the selected radio in state is updated via `value` props from parent component?

4. **Implementation with `redux-form`**


### Component to render form UI from form-template & Store form data in redux store

1. **Libraries used**
   - `redux-form`

2. **Implementation with `redux-form`**
   
   - Linking to redux using `redux-form` (Explain the component wrapping in this section)
     - How form data is structured in store? How we'd like to structure it? Why a dynamic form name is required?
     - How to implement dynamic form name with `redux-form`?

   - Rendering the form and linking the fields to `redux-form`
     - Which form to render?
     - How to retrieve the form-template for the form to render?
     - How to render individual form fields?
       - What are the props that are required by the `Field` component?
       - What are the props required by the custom component (provided by JSON config)?

### Persist form data in local storage

1. **Libraries used**
   - `redux-persist@4.x`

2. **Objectives**
   - Persist form data in local storage
   - Delay rendering of form until form data is loaded from local storage

3. **Implementation**
