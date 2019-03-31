import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';
import { withRouter } from 'react-router-dom';
import apiURL from '../../api';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }

    this.loginSubmit = this.loginSubmit.bind(this)
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  usernameChange(e) {
    e.preventDefault()
    this.setState({
      username: e.target.value,
      error: ''
    })
  }

  passwordChange(e) {
    e.preventDefault()
    this.setState({
      password: e.target.value,
      error: ''
    })
  }

  loginSubmit(e) {
    e.preventDefault()
    let error = false;
    fetch(`${apiURL}/api/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          error = true;
          break;
      }
      return response.json();
    })
    .then((data) => {
      if (error) {
        console.log(data)
        this.setState({error: data.message });
        console.log(this.state)
      } else {
        data.user.dislikes = (data.user.dislikes) ? data.user.dislikes : [];
        data.user.likes = (data.user.likes) ? data.user.likes : [];
        this.props.login( data.user );
        this.setState({error: '' });
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-login-container">

          <div className="side-panel">B<span style={{ color: '#17a2b8' }}>B</span></div>

          <div className="login-container">
            <header>Login/Register</header>
            <hr></hr>
            <Form onSubmit={(e) => this.loginSubmit(e)} style={{maxWidth: '40em', margin: '0 auto'}}>
            <h4>{this.state.error}</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.usernameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.passwordChange}
              />
            </Form.Group>
            <Button variant="info" type="submit">Submit</Button>
          </Form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  login: (user) => loginUser(user)
}

const ConnectedLoginPage = connect(null, mapDispatchToProps)(LoginPage);

export default withRouter(ConnectedLoginPage);
