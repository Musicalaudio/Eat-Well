import { Typography } from "@mui/material";
import {makeStyles } from "@material-ui/core";
import salad from "../images/salad.jpg"
import { UserContext } from "../contexts/UserContext";
import {useContext} from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: "wrap",
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      display: "block",
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(),
      paddingRight: theme.spacing(),
      paddingTop: theme.spacing(2),
    },
  },
  homeText: {
    [theme.breakpoints.up("lg")]: {
      position: "relative"
    }
  },
  description: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2)
    },
  },
  title: {
    width: "100%",
    textAlign: "center"
  },
  titleLarge: {
    display: "block",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
  },
  titleSmall: {
    display: "none",
    [theme.breakpoints.down('sm')]: {
      display: "block"
    },
  },
  image: {
    width: "50%",
    borderRadius: "8px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto"
    },
  },
  paragraph: {
    textAlign: "justify",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      textAlign: "left",
    }
  },
  imageText: {
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      bottom: "0",
      right: "0", 
      paddingRight: theme.spacing(3),
    },
  }
}))

const Home = () => {
  const {userState} = useContext(UserContext)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.homeText}>
        <div className={classes.description}>
            {Object.keys(userState).length !== 0 ?  
            <Typography className={classes.title} variant='h4' gutterBottom>Welcome, {userState.username}</Typography>
            : 
            <>
            <Typography className={`${classes.title} ${classes.titleLarge}`} variant='h4' gutterBottom>Welcome to Eat-Well</Typography>
            <Typography className={`${classes.title} ${classes.titleSmall}`} variant='h5' gutterBottom>Welcome to Eat-Well</Typography>
            </>
            }
          <Typography className={classes.paragraph} fontSize={17}>
            Eat-Well is a project created by Jordan D'Souza which uses the <a href='https://spoonacular.com/food-api'>Spoonacular API</a> to 
            allow users to search and filter through recipes, and save them to their account. This website uses ReactJS on the frontend and NodeJS on the backend, as well as MongoDB for 
            it's database (MERN Stack). It demonstrates usage and understanding of REST API and of how to create a 
            responsive fullstack web application. I hope you enjoy it! 
          </Typography>
        </div>
        <div  className={classes.imageText}>
          <Typography variant="caption" fontSize={17}>
            Photo by <a href="https://unsplash.com/@annapelzer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Anna Pelzer </a> on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash</a>
          </Typography>
        </div>
      </div>
      <img src={salad} alt="cakeImage" className={classes.image}/>
    </div>
   );
}
 
export default Home;