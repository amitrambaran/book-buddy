import React, { Component } from 'react'
import BookItem from './bookItem'

export class bookshelf extends Component {
  render() {
    return this.props.books.map((book) => (
        <BookItem key={ book.id } book={ book } />
    ));
  }
}

export default bookshelf
