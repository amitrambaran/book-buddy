import React, { Component } from 'react'
import StoryItem from '../bookshelf/storyItem';
import apiURL from '../../api';

export class homepage extends Component {
  componentWillMount() {
    this.getRandomStories(10);
    this.getNewStories(10);
  }

  getRandomStories(n) {
    fetch(`${apiURL}/api/stories/10`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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
        this.setState({ randStories: data.stories })
      })
  }

  getNewStories(n) {
    fetch(`${apiURL}/api/newstories/10`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
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
        this.setState({ newStories: data.stories })
      })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Homepage</h1>

        <div className="break"></div>

            <div className="main-panel-container">
              <header>New Stories</header>
              <hr></hr>
              <div className="book-container">
                {this.state && this.state.newStories && this.state.newStories.map(story => (
                  <StoryItem key={`new-${story.author}-${story.title}`} story={story}/>
                )
                )}
              </div>
            </div>

        <div className="break"></div>

            <div className="main-panel-container">
              <header>Random Stories</header>
              <hr></hr>
              <div className="book-container">
                {this.state && this.state.randStories && this.state.randStories.map(story => (
                  <StoryItem key={`random-${story.author}-${story.title}`} story={story}/>
                )
                )}
              </div>
            </div>

      </React.Fragment>
    )
  }
}

export default homepage
