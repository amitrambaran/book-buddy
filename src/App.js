/* THIS IS THE MAIN TEMPLATE */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Axios from 'axios';

/* Page Routes */
import About from './components/pages/about';
import Book from './components/pages/book';
import Homepage from './components/pages/homepage';
import Library from './components/pages/library';
import Login from './components/pages/login';
import Recommend from './components/pages/recommend';
import Saved from './components/pages/saved';
import Upload from './components/pages/upload';

/* Components */
import Navbar from './components/navBar/navBar';

/* Store */
import { addBooks } from './actions/index'


class App extends Component {

  // state = {
  //   // Hardcoded dummy data, JSON attributes TBD.
  //   books: [],
  //   user : null
  // }

  // Triggers on component mount.
  componentDidMount() {
    // API call.
    // var URL = 'http://my-json-server.typicode.com/amitrambaran/book-buddy/books/'
    // console.log(URL)
    // Axios.get(URL).then(res =>
    //   this.props.books = res.data
    // )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <br />

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

          {/* Route for About page */}
          <Route path="/book" render={props => (
            <React.Fragment>
              <Book />
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/library" render={props => (
            <React.Fragment>
              <Library />
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/login" render={props => (
            <React.Fragment>
              <Login />
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/recommend" render={props => (
            <React.Fragment>
              <Recommend user={this.props.currentuser}/>
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/saved" render={props => (
            <React.Fragment>
              <Saved />
            </React.Fragment>
          )} />

          {/* Route for About page */}
          <Route path="/upload" render={props => (
            <React.Fragment>
              <Upload />
            </React.Fragment>
          )} />
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
