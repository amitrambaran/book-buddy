import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    let bookToAdd = { ISBN: this.props.isbn, title: this.props.title, description: this.props.description, cover: `${this.props.cover}` }
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
    let bookToAdd = { ISBN: this.props.isbn, title: this.props.title, description: this.props.description, cover: `${this.props.cover}` }
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
          return;
      }
    })
    this.setState({ disabled: true })
  }
  bookBody = () => {
    return (
      <Card>
        <Card.Img src={`https://covers.openlibrary.org/b/id/${this.props.cover}-L.jpg`} />
        {this.props.likeable &&
          <div>
            <Button
              variant="success"
              style={{ position: 'absolute', top: '10px', left: '10px' }}
              onClick={this.onPlusClick}
              disabled={this.state.disabled}
            >+</Button>
            <Button
              variant="danger"
              style={{ position: 'absolute', top: '10px', right: '10px' }}
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

  render() {


    return (
      <div className="book-panel">
        {
          this.props.link ? 
          <Link
            to={ "/recommend/" + this.props.title.replace(/\s+/g, '_') }
            onClick={ this.forceUpdate }
          >
            {this.bookBody()}
          </Link> 
          :
          <div>
            {this.bookBody()}
          </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  likeBook: (book) => likeBook(book),
  dislikeBook: (book) => dislikeBook(book)
}

export default connect(null, mapDispatchToProps)(Book);
