import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router";
import parse from 'html-react-parser';

const RecipeInstructions = () => {
    //console.log('recipe title: ', recipeTitle)
    const [recipeSummary, setRecipeSummary] = useState(undefined)
    const [recipeData, setRecipeData] = useState(undefined)
    const [ingredientsData, setIngredientsData] = useState(undefined)
    const {title, id} = useParams()
    

    useEffect(()=>{
        axios.all([
                axios.get(`https://api.spoonacular.com/recipes/${id}/summary?apiKey=***REMOVED***`),
                axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=***REMOVED***`)
            ])
            .then(function (response) {
                setRecipeSummary(response[0].data)
                setRecipeData(response[1].data[0])
                console.log(response[1].data)
            })
            .catch(function (error) {
                // handle error
                console.log("recipe data error: ", error);
              })
    }, [id])

    useEffect(()=>{
        if(recipeData){
        let newIngredientsData = []
        recipeData['steps'].forEach(instruction => {
            instruction.ingredients.forEach(ingredient => {if(!newIngredientsData.includes(ingredient.name)){
                newIngredientsData.push(ingredient.name) 
            }})
        })
        setIngredientsData(newIngredientsData)
    }
    }, [recipeData])

    return ( 
        <>
            {(recipeSummary && recipeData)? 
            <>
            <h2>{recipeSummary.title}</h2>
            <h3>Summary:</h3>
            <p>{parse(recipeSummary.summary)}</p>
            <h3>Ingredients</h3>
            {ingredientsData? <div>{ingredientsData.map(ingredient => <p key={ingredient}> {ingredient} </p>)}</div>: <p>Fetching Ingredients...</p>}
            
            <h3>Instructions:</h3>
            {recipeData['steps'].map(instruction => 
                <div className="recipe-instructions" key={instruction.step}>
                    
                    <p><strong>{instruction.number}.</strong> {instruction.step}</p>
                </div>
            )}
            
            </>
            :
            <h2>Loading...</h2>
            }
        </>
    );
}
 
export default RecipeInstructions;