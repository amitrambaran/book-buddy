import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

// BookItem Component
// Displays singular book item on the bookshelf.
export class storyItem extends Component {
  render() {
    return (
      // Direct to book.js page upon clicking the item. Appends book ID to the URL.
      <Link
        to={ "/story/" + this.props.story.ID }
        onClick={ this.forceUpdate }
        style={{ color: 'black', textDecoration: 'none', border: 'solid black' }
      }>
        <h5>{ this.props.story.title }</h5>
        <h6>By: { this.props.story.author }</h6>
      </Link>
    )
  }
}

// Props (Values passed to component)
// book: book to by displayed (JSON slice).
storyItem.propTypes = {
    story: PropTypes.object.isRequired
}


export default storyItem;