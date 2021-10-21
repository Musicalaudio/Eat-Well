import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router";
import {makeStyles } from "@material-ui/core"
import { Typography } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PieChartIcon from '@mui/icons-material/PieChart';
import NoRecipe from "./NoRecipe"
import { Breadcrumbs, Link } from "@mui/material";
import Bookmark from "./Bookmark";

const useStyles = makeStyles((theme) => ({
    recipeContainer: {
        [theme.breakpoints.up("md")]: {
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
        },
    },
    recipeImage: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center"
        }
    },
    ingredients: {
        alignItems: "flex",
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
            paddingTop: theme.spacing(2),
        }
    },
    title: {
        //  textAlign: "center",
        display: "flex",
        justifyContent: "center",
    },
    instructionsTitle: {
        textAlign: "center",
    },
    instructions: {
        [theme.breakpoints.down("sm")]: {
            paddingTop: theme.spacing(2),
        }
    },
    noInstructions: {
        display: "flex",
        justifyContent: "center"  
    },
    iconWithText:{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",   
    },
    icons: {
        paddingRight: theme.spacing(1),
    },
    iconGroup: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            paddingTop: theme.spacing(1),
            justifyContent: "center"
        },
    },
    recipeHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        
    },
    topNav: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            display:"block",
        },
    },
    servings: {
        paddingLeft: theme.spacing(1)
    }, 
    bookmark: {
        display: "flex",
        justifyContent: "center",
    },
}));

const RecipeInstructions = ({response, ...props}) => {
    const classes = useStyles();
    const [recipeData, setRecipeData] = useState(undefined)
    const {id} = useParams()
    const [isPending, setIsPending] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [amounts, setAmounts] = useState([])
    const [noData, setNoData] = useState(false)

    let prevPath = props.location.state.prevPath
    let prevString =""
    if(prevPath){
        prevString = prevPath.toString();
        if(prevPath.lastIndexOf("/") !== 0){
            prevString =  prevPath.toString().substr(0, prevPath.lastIndexOf("/"))
        }
    }

    useEffect(()=>{
        const handleFetch = () => {
            if(response){
                response
                .then(function(response){
                    setRecipeData(response.data)
                    let newIngredients = []
                    let newAmounts = []
                    response.data.extendedIngredients.forEach(ingredient =>{ 
                        newIngredients.push(ingredient["name"].charAt(0).toUpperCase() + ingredient["name"].slice(1)) 
                        newAmounts.push(ingredient.measures["us"])
                    })
                    setAmounts(newAmounts)
                    setIngredients(newIngredients)
                })
                .catch(function (error) {
                    // handle error
                    setTimeout(() => {
                        setIsPending(false)
                        setNoData(true)
                    }, 1000);
                })
            }else{ 
                axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}`)
                .then(function (response) {
                    setRecipeData(response.data)
                    let newIngredients = []
                    let newAmounts = []
                    response.data.extendedIngredients.forEach(ingredient =>{ 
                        newIngredients.push(ingredient["name"].charAt(0).toUpperCase() + ingredient["name"].slice(1)) 
                        newAmounts.push(ingredient.measures["us"])
                    })
                    setAmounts(newAmounts)
                    setIngredients(newIngredients)
                })
                .catch(function (error) {
                    // handle error
                    setTimeout(() => {
                        setIsPending(false)
                        setNoData(true)
                    }, 1000);
                })
            }
        }
        handleFetch()
        return () => {
            setRecipeData(undefined)
            setAmounts([])
            setIngredients([])
        }
    }, [id, response]);

  
    return ( 
        <>
            {recipeData ? 
            <div>
                <div className={classes.topNav}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        {prevPath &&  prevPath.toString().substr(prevPath.lastIndexOf("/"),  prevPath.toString().length - prevPath.lastIndexOf("/")) !== "/filter"? 
                        <Link underline="hover" color="inherit" href={`${prevPath}`} >
                            {prevString.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g," ").trim().replace(/(?:^|\s)\S/g, a => a.toUpperCase())} 
                        </Link>
                        :
                        <Link underline="hover" color="inherit" href="/1/filter?">
                            Filter
                        </Link>
                        }
                        <Typography color="text.primary">{recipeData.title}</Typography>
                    </Breadcrumbs>
                    <div className={classes.iconGroup}>
                        <Typography className={`${classes.accessTime} ${classes.iconWithText}`}>
                            <AccessTimeFilledIcon className={classes.icons}/> Duration: {recipeData.readyInMinutes} minutes
                        </Typography>
                        <Typography className={classes.iconWithText}>
                                <PieChartIcon className={`${classes.servings} ${classes.icons}`}/> {recipeData.servings} servings 
                        </Typography>
                    </div>

                </div>
                <div className={classes.recipeHeader}>
                    <Typography className={classes.title} gutterBottom component="h5" variant="h5">
                        {recipeData.title}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.bookmark}>
                        <Bookmark recipePage={true} id={id} title={recipeData.title} image={recipeData.image} imageType={recipeData.imageType} className={classes.bookmarkIcon}/> 
                    </Typography>
                </div>
                <div className={classes.recipeContainer}>  
                    <div className={classes.recipeImage}>    
                        <img src={`https://spoonacular.com/recipeImages/${id}-556x370.jpg`} alt="RecipeImage"/>
                    </div>  
                   
                    <div className={classes.ingredients}>
                        <Typography variant='h6' component='h6'>Ingredients:</Typography>
                        {ingredients.length > 0 ?
                                                ingredients.map((item, index) => (
                                                    <Typography key={index} > 
                                                        
                                                        {`${item} - ${amounts[index].amount} ${amounts[index].unitShort}`} 
                                                    </Typography>))
                                             : <p>Fetching Ingredients...</p>    
                        }  
                    </div>
                </div>
                <div className={classes.instructions}>
                    <Typography className={classes.instructionsTitle} variant='h6' component='h6' gutterBottom>Instructions:</Typography>
                    {recipeData.analyzedInstructions.length !== 0 ? 
                        recipeData.analyzedInstructions[0].steps.map(instruction => 
                            <div key={instruction.step}>
                                <Typography>
                                    <strong>{instruction.number}.</strong> {instruction.step}
                                </Typography>
                            </div>
                        )
                        :
                        <div className={classes.noInstructions}>
                            <Typography>Sorry we couldn't retrieve the instructions for the recipe. You can find it on <a href={recipeData.sourceUrl} target="_blank" rel="noopener noreferrer" >{recipeData.sourceName}</a>.</Typography>
                        </div>
                    }
                </div >
            </div>
            :
            <div>
                {noData? <NoRecipe/> : isPending && <Typography>Loading...</Typography>}
            </div>
            }
        </>
    );
}
 
export default RecipeInstructions;