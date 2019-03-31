import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from '../review/review';
import AddReview from '../review/addreview';
import apiURL from '../../api';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let error = false;
    const id = window.location.pathname.split('/')[2]
    const url = `${apiURL}/api/story/${id}`
    fetch(url, {
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
            error = true;
            break;
        }
        return response.json()
      }).then((data) => {
        if (!error) {
          data.story.reviews = (data.story.reviews) ? data.story.reviews : [];
          this.setState({ story: data.story })
        }
        console.log(data);
      })
  }

  render() {
    return (
      <React.Fragment>
        {(!this.state.story) ?
          <h4>Story is loading</h4> :
          <div>
            <h1>{ this.state.story.title }</h1>
            <p>Author: {this.state.story.author}</p>
            {/* <p>Rating: { this.state.book.rating }</p> */}
            <div className="main-panel-container">
              { this.state.story.content }
            </div>
            <hr></hr>
            {this.props.user && this.props.user.username !== this.state.story.author &&
              <AddReview username={this.props.user.username} storyID={this.state.story.id}/>
            }
            {this.state.story.reviews.map(review => (
              <div className="main-panel-container">
                <Review reviewer={review.reviewer} comment={review.comment} score={review.score}></Review>
              </div>
            ))}
          </div>
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Story);
