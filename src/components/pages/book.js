import React, { Component } from 'react';
import Axios from 'axios';

export default class book extends Component {
  state = {
    book: []
  }

  // Triggers on component mount.
  componentDidMount() {
    // Get URL id information.
    var id = window.location.pathname.split('/')[2]

    // API call.
    var URL = 'http://my-json-server.typicode.com/amitrambaran/book-buddy/books/' + id
    console.log(URL)
    Axios.get(URL).then(res =>
      this.setState({ book: res.data })
    )
  }

  render() {
    return (
      <React.Fragment>
        <h1>Book Information</h1>
        <p>Page shows a given book's title, author, rating, desc, where to buy, etc..</p>
        <br/>
        <p>Book ID: { this.state.book.id }</p>
        <p>Title: { this.state.book.title }</p>
        <p>Author: { this.state.book.author }</p>
        <p>Rating: { this.state.book.rating }</p>
        <p>Description: { this.state.book.description }</p>
    </React.Fragment>
    )
  }
}
