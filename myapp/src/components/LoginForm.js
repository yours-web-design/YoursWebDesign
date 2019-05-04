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

import PermIdentity from "@material-ui/icons/PermIdentity";
import LockOutline from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    username: "",
    showPassword: false
  };

  showHide = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      let newState = { ...prevstate };
      if(newState.hasOwnProperty('showPassword')) {
        delete newState.showPassword;
      }
      newState[name] = value;
      return newState;
    });
  };


  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
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
            <h3
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              LOGIN
            </h3>
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
                  <FormControl style={{width:"100%"}}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.password}
                      onChange={this.handle_change}
                      name="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

              </Grid>
              <Grid container alignItems="center" justify="space-between">
                
                <Grid item style={{marginLeft: "auto"}}>
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
                    marginTop: "15px",
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
      </div>
    );
  }
}

export default withStyles(styles)(LoginTab);
