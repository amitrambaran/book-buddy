import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
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
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <Card style={{ maxWidth: '250px' }} className="book-panel">
          {/* <Card.Img src={`http://covers.openlibrary.org/b/isbn/${this.props.isbn}-L.jpg`} /> */}
          <Card.Header style={{ fontSize: '100px', color: 'white', backgroundColor: '#343a40'}}>{ this.props.story.title.substring(0, 1) }</Card.Header>
          <Card.Body>
            <Card.Title>{ this.props.story.title }</Card.Title>
            <Card.Text style={{ fontSize: '14px', margin: '0px'}}>
              Author: { this.props.story.author }
              <br/><br/>
              { this.props.story.content.substring(0, 200) }
            </Card.Text>
          </Card.Body>
        </Card>
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