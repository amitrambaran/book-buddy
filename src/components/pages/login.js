import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    
    this.loginSubmit = this.loginSubmit.bind(this)
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  usernameChange(e) {
    e.preventDefault()
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e) {
    e.preventDefault()
    this.setState({
      password: e.target.value
    })
  }

  loginSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then( response => console.log(response))
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login/Register</h1>
        <Form onSubmit={(e) => this.loginSubmit(e)}>
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
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </React.Fragment>
    )
  }
}
