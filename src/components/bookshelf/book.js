import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { likeBook, dislikeBook } from '../../actions/index';
import apiURL from '../../api'

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
  }

  onPlusClick(e) {
    e.preventDefault();
    let bookToAdd = { ISBN: this.props.isbn, title: this.props.title, description: this.props.description }
    fetch(`${apiURL}/api/like/${this.props.userID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookToAdd)
    }).then((response) => {
      switch (response.status) {
        case 200:
          this.props.likeBook(bookToAdd)
          break;
        default:
          // Add error handling
          return;
      }
    })
    this.setState({ disabled: true })
  }

  onMinusClick(e) {
    e.preventDefault();
    let bookToAdd = { ISBN: this.props.isbn, title: this.props.title, description: this.props.description }
    fetch(`${apiURL}/api/dislike/${this.props.userID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookToAdd)
    }).then((response) => {
      switch (response.status) {
        case 200:
          this.props.dislikeBook(bookToAdd)
          break;
        default:
          console.log('Error')
          return;
      }
    })
    this.setState({ disabled: true })
  }

  render() {
    return (
      <Card style={{ maxWidth: '250px' }} className="book-panel">
        <Card.Img src={`http://covers.openlibrary.org/b/isbn/${this.props.isbn}-L.jpg`} />
        {this.props.likeable && 
          <div>
            <Button
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'green' }}
              onClick={this.onPlusClick}
              disabled={this.state.disabled}
            >+</Button>
            <Button
              style={{ position: 'absolute', top: '10px', left: '10px', background: 'red' }}
              onClick={this.onMinusClick}
              disabled={this.state.disabled}
            >-</Button>
          </div>
        }
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text style={{ fontSize: '14px', margin: '0px' }}>
            {this.props.description.substring(0, 200)}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

const mapDispatchToProps = {
  likeBook: (book) => likeBook(book),
  dislikeBook: (book) => dislikeBook(book)
}

export default connect(null, mapDispatchToProps)(Book);
