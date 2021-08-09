import {AppBar, Toolbar, Typography, Tabs, Tab, makeStyles,
Popper, Grow, MenuList, MenuItem, Paper, ClickAwayListener} from "@material-ui/core";
import { Link } from "react-router-dom"
import {useState, useRef, useEffect} from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const NavMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>  
        <AppBar>
          <Toolbar className='tabs'>
            <Tabs centered> 
              <Tab label='Diets'
              ref={anchorRef}
              aria-controls={open ? 'diet-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}/>
              <Tab label='Cuisines'/>
              <Tab label='Meal Plan'/>
              <Tab label='Wines'/>
              <Tab label='Shopping'/>
              <Tab label='Random'/>
            </Tabs>
          </Toolbar>
        </AppBar>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="diet-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Gluten Free</MenuItem>
                    <MenuItem onClick={handleClose}>Ketogenic</MenuItem>
                    <MenuItem onClick={handleClose}>Vegetarian</MenuItem>
                    <MenuItem onClick={handleClose}>Lacto-Vegetarian</MenuItem>
                    <MenuItem onClick={handleClose}>Ovo-Vegetarian</MenuItem>
                    <MenuItem onClick={handleClose}>Vegan</MenuItem>
                    <MenuItem onClick={handleClose}>Paleo</MenuItem>
                    <MenuItem onClick={handleClose}>Primal</MenuItem>
                    <MenuItem onClick={handleClose}>Whole30</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
        
            </Grow>
          )}
        </Popper>

      </div>
    );
}
 
export default NavMenu;