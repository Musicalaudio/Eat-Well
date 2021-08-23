// import * as Yup from 'yup';
// import {useForm} from 'react-hook-form'
// import {AutoComplete} from '@material-ui/lab'
import {Button, Grid, Select, FormControl, InputLabel, TextField} from '@material-ui/core'
import { useState } from 'react';

const FilterForm = (props) => {
    const {url, formState, setFormState} = props
    // console.log(url);
    
    const [formData, setFormData] = useState({
        diets: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian',
                'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'],   
        cuisines: ["African", "American", "British", "Cajun", "Caribbean",
                   "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian",
                   "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
                    "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"], 
        intolerances: ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood",
                       "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat",],
        types: ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", 
               "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"],
       
    })

    const handleChange = (field, value) => {
        let newFormState = {...formState}
        newFormState[field] = value
        setFormState(newFormState)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted');
    }

    return ( 
        <>
            <h2>Filter</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Diet</InputLabel>    
                        <Select native displayEmpty={true} value={formState['dietState']} 
                        onChange={(e) =>handleChange('dietState', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.diets.map(diet =>
                                <option key={diet} value={diet}>{diet}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Cuisine</InputLabel>    
                        <Select native displayEmpty={true} value={formState['cuisineState']} 
                        onChange={(e) =>handleChange('cuisineState', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.cuisines.map(cuisine =>
                                <option key={cuisine} value={cuisine}>{cuisine}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Intolerance</InputLabel>    
                        <Select native displayEmpty={true} value={formState['intoleranceState']} 
                        onChange={(e) =>handleChange('intoleranceState', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.intolerances.map(intolerance =>
                                <option key={intolerance} value={intolerance}>{intolerance}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Recipe Type</InputLabel>    
                        <Select native displayEmpty={true} value={formState['typeState']} 
                        onChange={(e) =>handleChange('typeState', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.types.map(type =>
                                <option key={type} value={type}>{type}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel color="primary">Min Calories</InputLabel>
                        <TextField type="number" value={formState['minVal']} onChange={e => handleChange('minVal', e.target.value)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel color="primary">Max Calories</InputLabel>
                        <TextField type="number" value={formState['maxVal']} onChange={e => handleChange('maxVal', e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>  
        </>
    );
}
 
export default FilterForm;