// import { REHYDRATE } from 'redux-persist/constants';
import { reducer as FormDataReducer } from 'redux-form';

// export default enhanceFormReducer = (state, action) => {
//     if (action.meta && action.meta.form) {
//         console.log("Caught inside plugin")

//         return FormDataReducer.plugin(
//             {
//                 [action.meta.form]: (state, action) => {
//                     switch (action.type) {
//                         case REHYDRATE:
//                             return action.paylod[action.meta.form] || [];
//                             // return {
//                             //     ...state,
//                             //     ...action.payload[action.meta.form],
//                             //     rehydrated: true
//                             // } || [];
//                         default:
//                             return state;
//                     }
//                 }
//             }
//         )(state, action)
//     }

//     return FormDataReducer(state, action);
// }

export default FormDataReducer;