import * as Yup from 'yup';
import {useForm} from 'react-hook-form'


const FilterForm = (props) => {

    const FORM_VALIDATION = Yup.object().shape({

    });
    
    const {handleSubmit} = useForm();

    const onSubmit = () => {
  
    }  

    return ( 
        <>
            <h2>Filter</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>  
        </>
    );
}
 
export default FilterForm;