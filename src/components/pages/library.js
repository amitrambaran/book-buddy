import React, { Component } from 'react';
import { connect } from 'react-redux';
import Book from '../bookshelf/book';

class Library extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>User Library</h1>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Favourited Books</header>
          <hr></hr>
          ... Books here ...
        </div>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Liked Books</header>
          <hr></hr>
          <div>
            {(this.props.currentuser && this.props.currentuser.likes.length &&
                this.props.currentuser.likes.map(book => (
                  <Book key={book.isbn} userID={this.props.currentuser.ID} isbn={book.ISBN} title={book.title} description={book.description} />
                ))
            ) || <h6>You have no Books</h6>}

          </div>
        </div>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Want to Read</header>
          <hr></hr>
          ... Books here ...
        </div>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Your Uploads</header>
          <hr></hr>
          ... Books here ...
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentuser: state.user
  }
}

export default connect(mapStateToProps)(Library);