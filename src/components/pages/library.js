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
    fetch(`${apiURL}/api/userstories/${username}`)
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
          <header>Your Uploads</header>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state && this.state.userStories && this.state.userStories.map(story => (
              <StoryItem story={story} />
            )
            )}
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