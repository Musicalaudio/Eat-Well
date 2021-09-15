import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
// import eatwell from '../../images/eatwell.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 265,
  },
  media: {
    height: 120,
  },
});

const RecipeCard = (props) => {
  const {id, title, image} = props;
  const classes = useStyles();
  //const [titleParam, setTitleParam] = useState(title)
  //let recipeTitle = title;
  let urlTitle = title.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
                      .replace(/\s+/g, '-').toLowerCase();
  
  console.log(urlTitle)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Link to={`/recipe-instructions/${urlTitle}/${id}`} image={image}>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
          </Link>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
 
export default RecipeCard;