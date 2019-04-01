import React, { Component } from 'react';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/index';
import { Responsive } from 'semantic-ui-react';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logout();
  }


  render() {
    return (
      <React.Fragment >
        <Responsive minWidth={750}>
          <Navbar bg="dark" variant="dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Navbar.Brand href="/">Book Buddy</Navbar.Brand>
              {
                this.props.currentuser &&
                <Nav className="mr-auto">
                  <Nav.Link href="/library">Library</Nav.Link>
                  <Nav.Link href="/recommend">Recommendations</Nav.Link>
                  <Nav.Link href="/upload">Upload/Publish</Nav.Link>
                </Nav>
              }
            </div>
            {
              this.props.currentuser ?
                <Button variant="outline-info" href="/" onClick={this.onLogoutClick}>Logout</Button> :
                <Nav.Link href="/login" style={{ padding: '0' }}>
                  <Button variant="info" style={{ marginLeft: '15px' }} size="md">Login</Button>
                </Nav.Link>
            }
          </Navbar>
        </Responsive>
        <Responsive maxWidth={749}>
          <Navbar bg="dark" variant="dark" expand="md" style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
              <Navbar.Brand href="/">Book Buddy</Navbar.Brand>
              {
                this.props.currentuser &&
                <NavDropdown id="basic-nav-dropdown" style={{color: 'white'}}>
                  <Nav className="mr-auto">
                    <NavDropdown.Item>
                      <Link href="/library">Library</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link href="/recommend">Recommendations</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link href="/upload">Upload/Publish</Link>
                    </NavDropdown.Item>
                  </Nav>
                </NavDropdown>
              }
            </div>
            {
              this.props.currentuser ?
                <Button variant="outline-info" href="/" onClick={this.onLogoutClick}>Logout</Button> :
                <Nav.Link href="/login" style={{ padding: '0' }}>
                  <Button variant="info" style={{ marginLeft: '15px' }} size="md">Login</Button>
                </Nav.Link>
            }
          </Navbar>
        </Responsive>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentuser: state.user
  }
}

const mapDispatchToProps = {
  logout: () => logoutUser()
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
