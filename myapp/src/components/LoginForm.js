import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import PermIdentity from "@material-ui/icons/PermIdentity";
import LockOutline from "@material-ui/icons/Lock";


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  }
});

class LoginTab extends React.Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    const { classes } = this.props;
    return (

      <Paper
        className={classes.padding}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "30px",
          width: "350px",
          height: "400px"
        }}
      >
        <section className="login" id="login">
          <header
            style={{
              position: "relative",
              width: "100%",
              padding: "8px",
              margin: "-8px -8px -8px -8px",
              background: "#2196f3",
              fontSize: "1rem",
              fontFamily: "Roboto, sans-serif",
              color: "#FAFAFA",
              height: "80px",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px"
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              <AccountCircle />
            </span>
          </header>
          <form onSubmit={e => this.props.handle_login(e, this.state)}>
            <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <span><PermIdentity /></span>
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth
                    autoFocus
                    required
                    value={this.state.email}
                    onChange={this.handle_change}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <span><LockOutline /></span>
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <Button
                    disableFocusRipple
                    disableRipple
                    style={{ textTransform: "none" }}
                    variant="text"
                    color="primary"
                    
                  >
                    Forgot password ?
                  </Button>
                </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: "10px" }}>
                <Button
                  variant="contained"
                  style={{
                    background: "#2196f3",
                    color: "#FFF",
                    marginTop:"15px",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginTab);
