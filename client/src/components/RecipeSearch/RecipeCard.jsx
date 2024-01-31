import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {useLocation, Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import Bookmark from './Bookmark';

const useStyles = makeStyles({
  root: {
    maxWidth: 265,
  },
  media: {
    height: 120,
  },
});

const RecipeCard = ({id, title, image, imageType}) => {
  const classes = useStyles();
  let urlTitle = title.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
                      .replace(/\s+/g, '-').toLowerCase();

  const prevPath = useLocation().pathname;

  return (
    <Card className={classes.root}>
      <Link to={{pathname: `/recipe-instructions/${urlTitle}/${id}`, state: {prevPath} }}  style={{textDecoration: 'none', color: 'black'}}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
            <Tooltip title={title}>
              <Typography gutterBottom /*component="h2"*/ variant="subtitle2" noWrap>
                {title}
              </Typography>
            </Tooltip>
        </CardContent>
      </CardActionArea>
      </Link>
      <CardActions>
          <Bookmark id={id} title={title} image={image} imageType={imageType}/>
      </CardActions>
    </Card>
  );
}
 
export default RecipeCard;