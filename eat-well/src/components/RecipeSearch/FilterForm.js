// import * as Yup from 'yup';
// import {useForm} from 'react-hook-form'
// import {AutoComplete} from '@material-ui/lab'
import {Button, Grid, Select, FormControl, InputLabel, TextField} from '@material-ui/core'
import { useState } from 'react';

const FilterForm = ({offset, page, number, fetchedUrl, setFetchedUrl, formState, setFormState}) => {
    
    console.log('page: ', page, 'number: ', number, 'offset: ', offset)


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
        let url = ***REMOVED***
        // console.log('submitted');
        for (var state in formState){
            //console.log(state)
            if(formState[state].length > 0){  
                // console.log(state.length)
                url += `&${state.replace(/\s/g, "")}=${formState[state].replace(/\s/g, "")}`
            } 
        }
        setFetchedUrl(url);
    }


    return ( 
        <>
            <h2>Filter</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Diet</InputLabel>    
                        <Select native displayEmpty={true} value={formState['diet']} 
                        onChange={(e) =>handleChange('diet', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.diets.map(diet =>
                                <option key={diet} value={diet}>{diet}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Cuisine</InputLabel>    
                        <Select native displayEmpty={true} value={formState['cuisine']} 
                        onChange={(e) =>handleChange('cuisine', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.cuisines.map(cuisine =>
                                <option key={cuisine} value={cuisine}>{cuisine}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Intolerance</InputLabel>    
                        <Select native displayEmpty={true} value={formState['intolerances']} 
                        onChange={(e) =>handleChange('intolerances', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.intolerances.map(intolerance =>
                                <option key={intolerance} value={intolerance}>{intolerance}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel color="primary">Recipe Type</InputLabel>    
                        <Select native displayEmpty={true} value={formState['type']} 
                        onChange={(e) =>handleChange('type', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.types.map(type =>
                                <option key={type} value={type}>{type}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel color="primary">Min Calories</InputLabel>
                        <TextField type="number" value={formState['minCalories']} onChange={e => handleChange('minCalories', e.target.value)}/>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel color="primary">Max Calories</InputLabel>
                        <TextField type="number" value={formState['maxCalories']} onChange={e => handleChange('maxCalories', e.target.value)}/>
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