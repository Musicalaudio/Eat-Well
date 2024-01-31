import {Typography, makeStyles} from "@material-ui/core"
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(6),
        paddingLeft: theme.spacing(13),
        paddingRight: theme.spacing(13),
    }
}))

const PageNotFound = () => {
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <Typography variant="h4">Sorry...</Typography>
            <Typography variant="subtitle1">The page you're looking for doesn't exist.</Typography>
            <Link to="/"><Typography variant="subtitle1">Click here to return to home page.</Typography></Link>
        </div>
    )

}

export default PageNotFound;