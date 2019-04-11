import React, { Component } from 'react'
import StoryItem from '../bookshelf/storyItem';
import apiURL from '../../api';

export class homepage extends Component {
  componentWillMount() {
    this.getRandomStories(8);
    this.getNewStories(8);
  }

  getRandomStories(n) {
    fetch(`${apiURL}/api/stories/${n}`, {
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
    fetch(`${apiURL}/api/newstories/${n}`, {
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
        data.stories.sort((a,b) => {
          return b.ID - a.ID 
        })
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
