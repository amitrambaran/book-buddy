import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './bookshelf.css';

// BookItem Component
// Displays singular book item on the bookshelf.
export class bookItem extends Component {
  render() {
    return (
      <div>
        <h2>{ this.props.book.title }</h2>
        <img src={ this.props.book.cover } alt={ this.props.book.title + ' cover art'} width="150" height="240"></img>
        <h3>{ this.props.book.author }</h3>
        <h3>{ this.props.book.rating }</h3>

        <br/>
      </div>
    )
  }
}

// Props (Values passed to component)
// book: book to by displayed (JSON slice).
bookItem.propTypes = {
    book: PropTypes.object.isRequired
}


export default bookItem
