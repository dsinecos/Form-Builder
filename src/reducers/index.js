import { combineReducers } from 'redux';
// import { reducer as formDataReducer } from 'redux-form';
import formDataReducer from './FormDataReducer';
import FormTemplatesReducer from './FormTemplatesReducer';

export default combineReducers({
    form: formDataReducer,
    formTemplates: FormTemplatesReducer
})