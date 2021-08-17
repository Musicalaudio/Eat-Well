import {TextField} from '@material-ui/core'
import { useField } from 'formik'; //makes formik aware of changes in this component

const TextFieldWrapper = ({name, ...otherProps}) => {
    const [field, meta] = useField(name)
    
    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    }

    if(meta && meta.touched && meta.error){
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }
    
    return (
        <TextField {...configTextField}/>
      );
}
 
export default TextFieldWrapper;