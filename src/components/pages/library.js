import React, { Component } from 'react';
import { connect } from 'react-redux';
import Book from '../bookshelf/book';
import StoryItem from '../bookshelf/storyItem'
import apiURL from '../../api';

class Library extends Component {
  componentWillMount() {
    if (this.props.currentuser) {
      this.getUserStories(this.props.currentuser.username)
    }
  }

  getUserStories(username) {
    fetch(`${apiURL}/api/userstories/${username}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            break
          default:
            break;
        }
        return response.json()
      }).then((data) => {
        this.setState({ userStories: data.stories })
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>User Library</h1>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Liked Books</header>
          <hr></hr>
          <div className="book-container">
            {(this.props.currentuser && this.props.currentuser.likes.length &&
              this.props.currentuser.likes.map(book => (
                <Book key={book.ISBN} userID={this.props.currentuser.ID} isbn={book.ISBN} title={book.title} description={book.description} cover={book.cover} link/>
              ))
              ) || <h6>You have no Books</h6>
            }
          </div>
        </div>

        <div className="break"></div>

        <div className="main-panel-container">
          <header>Your Stories</header>
          <hr></hr>
          <div className="book-container">
            {(this.state && this.state.userStories && this.state.userStories.length &&
            this.state.userStories.map(story => (
              <StoryItem key={`${story.author}-${story.title}`} story={story} />
            ))) || <h5>You have no stories</h5>
          }
          </div>
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