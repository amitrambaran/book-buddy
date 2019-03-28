import React, { Component } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/index';

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
      <React.Fragment>
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
              <Button variant="outline-info" onClick={this.onLogoutClick}>Logout</Button>:
              <Nav.Link href="/login" style={{padding: '0'}}>
                <Button variant="info" style={{ marginLeft: '15px' }} size="md">Login</Button>
              </Nav.Link>
          }
        </Navbar>
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
