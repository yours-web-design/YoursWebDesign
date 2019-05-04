import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 0,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Nav(props) {
  const { classes } = props;
  const logged_out_nav = (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Yours Web Design
          </Typography>
          <div className="nav-left">
          <Button color="inherit" onClick={() => props.display_form('login')}>Login</Button>
          <Button color="inherit" onClick={() => props.display_form('signup')}>SignUp</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>

  );

  const logged_in_nav = (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Yours Web Design
        </Typography>
        <div className="nav-left">
        <Button color="inherit" onClick={props.handle_logout}>logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  </div>
   
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default withStyles(styles)(Nav);

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};