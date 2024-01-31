import {AppBar, Toolbar, Typography, makeStyles, Input, InputAdornment, Button, Box} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom"
import {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from 'axios';
import {useHistory} from 'react-router-dom' 
import ProfileMenu from "./ProfileMenu"
import DrawerMenu from "./DrawerMenu";
import ProfileDrawerMenu from "./ProfileDrawerMenu";

const useStyles = makeStyles((theme) => ({
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  logo:{
    display: "none",
    marginBottom: theme.spacing(.7),
  },
  logoLg: {
    [theme.breakpoints.up("lg")]: {
      display: "block",
    }
  },
  logoMd: {
    [theme.breakpoints.up("md")]: {
      display: "block"
    },
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  logoSm: {
    [theme.breakpoints.down("sm")]: {
      display: "block"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  logoXs: {
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  },
  centeredItems: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  input: {
    background: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  utilButtons: {
    marginBottom: theme.spacing(.18),
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  utilButton1: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  }

  }));


const NavMenu = () => {
  const classes = useStyles();
  const {userState} = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();
  const [random, setRandom] = useState(undefined)

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if(searchValue.length > 0){
      history.push(`/search/${searchValue}`)
    }
  }
  
  const getRandomRecipe = async () => {
    setRandom(undefined)
    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_KEY}&number=1`)
            .then(function (response){
                const urlTitle = (response.data.recipes[0].title).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
                                                              .replace(/\s+/g, '-').toLowerCase();
          
                setRandom(response.data.recipes[0])
                history.push({pathname:`/recipe-instructions/${urlTitle}/${response.data.recipes[0].id}`,
                  state:{response: random}
                })
            })
            .catch(function (err){
              console.log(err)
            })
  }

  return (
      <AppBar position='static'>
        <Toolbar className={classes.tabs}>
        <Typography className={`${classes.logo} ${classes.logoLg}`} variant="h3" component="h1"><Link to='/'style={{color: '#FFF', textDecoration: 'none'}}>Eat-Well</Link></Typography>
        <Typography className={`${classes.logo} ${classes.logoMd}`} variant="h4" component="h1"><Link to='/'style={{color: '#FFF', textDecoration: 'none'}}>Eat-Well</Link></Typography>
        <Typography className={`${classes.logo} ${classes.logoSm}`} variant="h6" component="h1"><Link to='/'style={{color: '#FFF', textDecoration: 'none'}}>Eat-Well</Link></Typography>
        <Typography className={`${classes.logo} ${classes.logoXs}`} variant="h6" component="h1"><Link to='/'style={{color: '#FFF', textDecoration: 'none'}}>Eat-Well</Link></Typography> 
          <div className={classes.centeredItems}>
            <form onSubmit={(event) => handleSearchSubmit(event)}>
              <Input placeholder="Search Recipe..." type="text" className={classes.input} value={searchValue} 
                      endAdornment={<InputAdornment position="end">
                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                      <SearchIcon />
                                    </IconButton>
                                    </InputAdornment>} 
                      onChange={event => setSearchValue(event.target.value)}
              />
            </form>
            <Button onClick={() => getRandomRecipe()} className={`${classes.utilButtons} ${classes.utilButton1}`} variant="contained" size="small" color="secondary" disableElevation>
              Random
            </Button>
            <Link to="/1/filter?" style={{ textDecoration: 'none' }}>
              <Button className={classes.utilButtons} variant="contained" size="small" color="secondary" disableElevation>
              Filter
            </Button>
            </Link>
          </div>
          <div className='admin-buttons'>
            {Object.keys(userState).length !== 0 ?
              <>
                <Box className={classes.utilButtons}>
                  <ProfileMenu />
                </Box>
                <Box className={classes.menuButton}>
                    <ProfileDrawerMenu getRandomRecipe={getRandomRecipe}/>
                </Box>
              </>
            :
              <div >
                <Link to="/log-in" style={{ textDecoration: "none" }}> 
                  <Button className={classes.utilButtons} style={{ color: '#FFF' }}>Log In</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}> 
                  <Button className={classes.utilButtons} style={{ color: '#FFF' }}>Register</Button>
                </Link>
                <Box className={classes.menuButton}>
                  <DrawerMenu getRandomRecipe={getRandomRecipe}/>
                </Box>
              </div>
            }
            </div>
        </Toolbar>
      </AppBar>
    );
}
 
export default NavMenu;