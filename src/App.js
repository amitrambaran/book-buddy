/* THIS IS THE MAIN TEMPLATE */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

/* Page Routes */
import About from './components/pages/about';
import Story from './components/pages/story';
import Homepage from './components/pages/homepage';
import Library from './components/pages/library';
import Login from './components/pages/login';
import Recommend from './components/pages/recommend';
import Upload from './components/pages/upload';

/* Components */
import Navbar from './components/navBar/navBar';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <br />

          <div className="container">
            {/* Route for Homepage */}
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Homepage books={this.props.userbooks} />
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/about" render={props => (
            <React.Fragment>
              <About />
            </React.Fragment>
          )} />
          
          {/* Route for Login page */}
          <Route path="/login" render={props => (
            <React.Fragment>
              <Login />
            </React.Fragment>
          )} />
          
          {/* Route for Book Details page */}
          <Route path="/story" render={props => (
            <React.Fragment>
              <Story />
            </React.Fragment>
          )} />

          {/* Route for Libray page */}
          <Route path="/library" component={Library}/>


          {/* Route for Recommend page */}
          <Route path="/recommend" render={props => (
            <React.Fragment>
              <Recommend user={this.props.currentuser}/>
            </React.Fragment>
          )} />

          {/* Route for Upload page */}
          <Route path="/upload" render={props => (
            <React.Fragment>
              <Upload />
            </React.Fragment>
          )} />
          </div>
          <br/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  return {
    currentuser: state.user,
    userbooks: state.books
  };
};

export default connect(mapStateToProps)(App);
