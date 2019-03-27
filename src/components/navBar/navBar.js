import React, { Component } from 'react'
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'

// Navigation Bar Component
export default class navBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Book Buddy</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/library">Library</Nav.Link>
                <Nav.Link href="/recommend">Recommendations</Nav.Link>
                <Nav.Link href="/upload">Upload/Publish</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
      </React.Fragment>
    )
  }
}
