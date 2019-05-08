
import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch(`http://localhost:8000/api/users/${localStorage.getItem('pk')}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            first_name: json.first_name,
            last_name: json.last_name,
            email: json.email
          });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    data.username = data.email;
    if(data.hasOwnProperty('showPassword')) {
      delete data.showPassword;
    }
    fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('pk', json.user.pk);
        this.setState({
          logged_in: true,
          displayed_form: '',
          email: json.user.email,
          first_name: json.user.first_name,
          last_name: json.user.last_name,
          pk: json.user.pk
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    console.log(data);
    let obj = { ...data };
    let { email, first_name, last_name, phone_number, date_of_birth, gender, country, password } = obj;
    let profile = {
      country,
      date_of_birth,
      gender,
      phone_number
    }
    let objFinal = {
      email,
      first_name,
      last_name,
      password,
      profile

    };


    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(objFinal)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        
        this.setState({
          logged_in: true,
          displayed_form: '',
          email: json.email,
          first_name: json.first_name,
          last_name: json.last_name,
          url:json.url
        });

        const primaryKey = this.state.url.split("/")[5];
        localStorage.setItem('pk', primaryKey);
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, email: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.email}`
            : null}
        </h3>
      </div>
    );
  }
}

export default App;
