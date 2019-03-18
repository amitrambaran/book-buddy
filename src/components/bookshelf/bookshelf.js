import React, { Component } from 'react'
import BookItem from './bookItem'

// Bookshelf Component
// Displays in a grid/tile view a collection of books.
//
// Props
// books: collections of books (JSON).
export class bookshelf extends Component {
  render() {
    // Map: for each item "book" in "books", run the following:
    return this.props.books.map((book) => (
        <BookItem key={ book.id } book={ book } />
    ));
  }
}

export default bookshelf
