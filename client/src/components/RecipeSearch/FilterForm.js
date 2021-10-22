import {Button, Grid, Select, InputLabel, TextField} from '@material-ui/core'
import { useState, useEffect } from 'react';
import queryString from "query-string"
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';

/*used to remove white spaces from an array so we can check if the query params 
are valid according to the form data so that the formState matched the queryparams if 
we filter using the url instead of the ui (form)*/
const unformatted = (array) => {
    return array.map(item => item.toString().replace(/\s+/g, '').toLowerCase())
}

const FilterForm = ({setQueryParams, page, fetchVariables, fetchHooks, queryErrors, setQueryErrors}) => {
    const history = useHistory();
    const { search } = useLocation();
    const {diet, cuisine, intolerances, type, minCalories, maxCalories} = queryString.parse(search)
    const {fetchedUrl, offset, number, queryParams, apiKey} = fetchVariables
    const {setRecipeData, setTotalResults, setIsPending, setDisplayQueryErrors} = fetchHooks

    const [formData, setFormData] = useState({
        diet: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian',
                'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'],   
        cuisine: ["African", "American", "British", "Cajun", "Caribbean",
                    "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian",
                    "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
                    "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"], 
        intolerances: ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood",
                        "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat",],
        type: ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", 
                "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"],
    })

    const [formState, setFormState] = useState({
        diet: diet || "",
        cuisine: cuisine || "",
        intolerances: intolerances || "",
        type: type || "", 
        minCalories: minCalories || "",
        maxCalories: maxCalories || "",
    }) 
    
    useEffect(()=>{
        //adjusts the state of the form based on the query params
        let newFormState = {...formState}
        let newQueryErrors = []
        let queryObject = queryString.parse(search)
        if(Object.keys(queryObject).length !== 0){
            for(let queryKey in queryObject){
                let lowercaseQueryKey = queryKey.toLowerCase()
                //if paramKey is maxCalories or minCalories
                if(queryKey.toLowerCase() === "maxcalories" || queryKey.toLowerCase() === "mincalories"){
                    let maxOrMin = Object.keys(newFormState)[unformatted(Object.keys(newFormState)).indexOf(queryKey.toLowerCase())]
                    //if the query value is less than 0
                    if(Number(queryObject[queryKey]) < 0){
                        if(maxOrMin === 'minCalories'){
                            newQueryErrors.push(`Please use positive numbers only for the Min Calories field.`)
                        }else{
                            newQueryErrors.push(`Please use positive numbers only for the Max Calories field.`)
                        }
                    }
                    //if the query value is not a pure number (if it includes letters)
                    else if(isNaN(Number(queryObject[queryKey]))){
                        if(maxOrMin === 'minCalories'){
                            newQueryErrors.push(`Please use numbers ONLY as input for the Min Calories field.`)
                        }else{
                            newQueryErrors.push(`Please use numbers ONLY as the input for the Max Calories field.`)
                        }
                    }
                    //if the valid query value (positive number) 
                    else {
                        newFormState[maxOrMin] = queryObject[queryKey]
                    }
                }
                //if the query key is a valid field to searchy by
                else if(Object.keys(formData).includes(queryKey.toLowerCase())){
                     /*remove spaces from formData array items and lowercase both queryParams and formData array items so we can
                    ignore case sensitivity*/ 
                    let unformattedData = unformatted(formData[lowercaseQueryKey])
                    let lowercaseQueryValue = queryObject[queryKey].toLowerCase()
                    if(unformattedData.includes(lowercaseQueryValue)){
                        newFormState[lowercaseQueryKey] = formData[lowercaseQueryKey][unformattedData.indexOf(lowercaseQueryValue)]                   
                    }
                    else if(Number(queryObject[queryKey].toLowerCase())){
                        newQueryErrors.push(`Numbers are not a valid input for the ${queryKey} field`)
                    }
                    else{
                        //the string for the queryValue was not a valid input for the queryKey
                        newQueryErrors.push(`The ${queryKey} filter option does not include ${queryObject[queryKey]} as a valid input.`)
                    }
                }else{
                    //the queryKey is invalid
                    newQueryErrors.push(`${queryKey} is not a valid field to search by`)
                }
    
            }
            setQueryErrors(newQueryErrors)
            setFormState(newFormState)
        }
    }, [])

    useEffect(() => {
        if(queryErrors.length === 0){
            axios.get(`${fetchedUrl}${queryParams}&apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&number=${number}&offset=${offset}`)
            .then(function (response) {
                setRecipeData(response.data.results)
                if(response.data.totalResults > 900){
                    setTotalResults(900 + number)
                }else{
                    setTotalResults(response.data.totalResults)
                }
                setIsPending(false);
            })
            .catch(function (error) {
                // handle error
                setIsPending(false);
                // setDisplayQueryErrors(true);
            });
        }else{
            setIsPending(false);
            setDisplayQueryErrors(true);
        }
      }, [apiKey, fetchedUrl, number, offset, queryErrors, queryParams, setDisplayQueryErrors, setIsPending, setRecipeData, setTotalResults])
    

    const handleChange = (field, value) => {
        let newFormState = {...formState}
        if(value < 0){
            value = 0
        }
        newFormState[field] = value
        setFormState(newFormState)
    }
    
    const handleFilter = (event) => {
        event.preventDefault();
        setIsPending(true)
        let newQueryParams = []
        for (let state in formState){
            if(formState[state].length > 0){  
                newQueryParams.push(`${state.replace(/\s/g, "")}=${formState[state].replace(/\s/g, "")}`)
            } 
        }
        let queryParamString = newQueryParams.join('&')
        setQueryParams(queryParamString)
        history.push(`/${page}/filter?${queryParamString}`)
    }

    return ( 
        <>
            <h2>Filter</h2>
            <form onSubmit={e => handleFilter(e)}>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={4} xs={6}>
                        <InputLabel color="primary">Diet</InputLabel>    
                        <Select native displayEmpty={true} value={formState['diet']} 
                        onChange={(e) =>handleChange('diet', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.diet.map(diet =>
                                <option key={diet} value={diet}>{diet}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12} sm={4} xs={6}>
                        <InputLabel color="primary">Cuisine</InputLabel>    
                        <Select native displayEmpty={true} value={formState['cuisine']} 
                        onChange={(e) =>handleChange('cuisine', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.cuisine.map(cuisine =>
                                <option key={cuisine} value={cuisine}>{cuisine}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12} sm={4} xs={6}>
                        <InputLabel color="primary">Intolerance</InputLabel>    
                        <Select native displayEmpty={true} value={formState['intolerances']} 
                        onChange={(e) =>handleChange('intolerances', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.intolerances.map(intolerance =>
                                <option key={intolerance} value={intolerance}>{intolerance}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item lg={12} md={12}  sm={4} xs={6}>
                        <InputLabel color="primary">Recipe Type</InputLabel>    
                        <Select native displayEmpty={true} value={formState['type']} 
                        onChange={(e) =>handleChange('type', e.target.value)} >
                            <option aria-label="None" value="" />
                            {formData.type.map(type =>
                                <option key={type} value={type}>{type}</option>
                            )}
                        </Select>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={6}>
                        <InputLabel color="primary">Min Calories</InputLabel>
                        <TextField type="number" value={formState['minCalories']} onChange={e => handleChange('minCalories', e.target.value)}/>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={6}>
                        <InputLabel color="primary">Max Calories</InputLabel>
                        <TextField type="number" value={formState['maxCalories']} onChange={e => handleChange('maxCalories', e.target.value)}/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
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