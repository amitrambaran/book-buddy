import React, { Component } from 'react'
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'

// Navigation Bar Component
export default class navBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Book <span style={{ color: '#17a2b8' }}>Buddy</span></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/library">Library</Nav.Link>
            <Nav.Link href="/recommend">Recommendations</Nav.Link>
            <Nav.Link href="/upload">Upload/Publish</Nav.Link>
          </Nav>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" size="md"/>
            <Button variant="outline-info" size="md">Search</Button>
          </Form>
          
          <Button variant="info" style={{ marginLeft: '15px' }} href='/login' size="md">Login</Button>
        </Navbar>
      </React.Fragment>
    )
  }
}
