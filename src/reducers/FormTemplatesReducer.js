const INITIAL_STATE = [
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
            },
            {
                name: "testRadio",
                label: "Testing Radio buttons",
                default: "Value3",
                fieldType: "RADIO",
                radioOptions: [
                    {
                        label: "Label1",
                        value: "Value1"
                    },
                    {
                        label: "Label2",
                        value: "Value2"
                    },
                    {
                        label: "Label3",
                        value: "Value3"
                    },
                    {
                        label: "Label4",
                        value: "Value4"
                    }
                ]
            }
        ]
    }
]

// INITIAL_STATE.filter((formTemplate) => {
//     console.log(formTemplate);
//     console.log(formTemplate.formID);
//     console.log(formTemplate.formID === "1");
// })

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}