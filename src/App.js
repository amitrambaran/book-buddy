/* THIS IS THE MAIN TEMPLATE */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/* Page Routes */
import About from './components/pages/about';
import Book from './components/pages/book';
import Homepage from './components/pages/homepage';
import Library from './components/pages/library';
import Login from './components/pages/login';
import Recommend from './components/pages/recommend';
import Saved from './components/pages/saved';
import Upload from './components/pages/upload';

class App extends Component {
  state = {
    // Hardcoded dummy data, JSON attributes TBD.
    books: [
      {
        id: 1,
        title: 'The Brothers Karamazov',
        author: 'Theodore Dostoevsky',
        cover: 'https://media1.popsugar-assets.com/files/thumbor/1RZgraw7QVcWY3lPkJfy6RI9sOU/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2012/11/46/2/301/3019466/888c4748aa72fd03_683586_3597231_lz/i/Brothers-Karamazov.jpg',
        rating: 5
      },
      {
        id: 2,
        title: 'Thus Spoke Zarathustra',
        author: 'Friedrich Nietzsche',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51vp6JxnI3L._SX331_BO1,204,203,200_.jpg',
        rating: 5
      },
      {
        id: 3,
        title: 'Meditations',
        author: 'Marcus Aurelius',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51cQEdN9KuL._SX331_BO1,204,203,200_.jpg',
        rating: 5
      }
    ]
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Book Buddy</h1>
          <br/>

          {/* Route for Homepage */}
          <Route exact path="/" render={ props => (
            <React.Fragment>
              <Homepage books={ this.state.books }/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/about" render={ props => (
            <React.Fragment>
              <About/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/book" render={ props => (
            <React.Fragment>
              <Book/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/library" render={ props => (
            <React.Fragment>
              <Library/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/login" render={ props => (
            <React.Fragment>
              <Login/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/recommend" render={ props => (
            <React.Fragment>
              <Recommend/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/saved" render={ props => (
            <React.Fragment>
              <Saved/>
            </React.Fragment>
          )}/>

          {/* Route for About page */}
          <Route path="/upload" render={ props => (
            <React.Fragment>
              <Upload/>
            </React.Fragment>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
