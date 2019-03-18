/* THIS IS THE MAIN TEMPLATE */

import React, { Component } from 'react';
import './App.css';

import Bookshelf from './components/bookshelf/bookshelf'

class App extends Component {
  state = {
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
      <div className="App">
        <h1>UNDER DEVELOPMENT</h1>

        <br/>

        <Bookshelf books={ this.state.books } />
      </div>
    );
  }
}

export default App;
