import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Stars from './stars';

// BookItem Component
// Displays singular book item on the bookshelf.
export class storyItem extends Component {

  getAverageScore(reviews){
    let sum = 0
    reviews.forEach(review => {
      sum += review.score
    });
    return (sum) ? (sum / reviews.length).toFixed(2): sum;
  }

  render() {
    return (
      // Direct to book.js page upon clicking the item. Appends book ID to the URL.
      <div className="book-panel">
        <div>
          <Link
            to={ "/story/" + this.props.story.ID }
            onClick={ this.forceUpdate }
            style={{ textDecoration: 'none', color: 'black'}}
          >
            <Card>
              {
                this.props.story.reviews &&
                <Stars
                  score={this.getAverageScore(this.props.story.reviews) }
                  style={{position: 'absolute', right: '10px', top: '5px'}}
                />
              }
              {
                this.props.story.cover ? 
                <Card.Img style={{maxHeight: '250px'}} src={this.props.story.cover}/>                
                :
                <Card.Header style={{ fontSize: '100px', color: 'white', backgroundColor: '#343a40'}}>
                { this.props.story.title.substring(0, 1) }
                </Card.Header>
              }
              <Card.Body>
                <Card.Title>{ this.props.story.title }</Card.Title>
                <Card.Text style={{ fontSize: '14px', margin: '0px'}}>
                  Author: { this.props.story.author }
                  <br/><br/>
                  { this.props.story.content.substring(0, 200).replace(/[#>_]+/g, '') + '...' }
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    )
  }
}

// Props (Values passed to component)
// book: book to by displayed (JSON slice).
storyItem.propTypes = {
    story: PropTypes.object.isRequired
}


export default storyItem;