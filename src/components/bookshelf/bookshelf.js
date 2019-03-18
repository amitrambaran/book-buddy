import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookItem from './bookItem';

// Bookshelf Component
// Displays in a grid/tile view a collection of books.
export class bookshelf extends Component {
  render() {
    // Map: for each item "book" in "books", run the following:
    return this.props.books.map((book) => (
        <BookItem key={ book.id } book={ book } />
    ));
  }
}

// Props (Values passed to component)
// books: collections of books (JSON).
bookshelf.propTypes = {
    books: PropTypes.array.isRequired
}

export default bookshelf
