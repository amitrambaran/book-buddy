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
        <h1>Book Information</h1>
        <p>Page shows a given book's title, author, rating, desc, where to buy, etc..</p>
        <br />
        {(!this.state.story) ?
          <h4>Story is loading</h4> :
          <div>
            <p>Title: {this.state.story.title}</p>
            <p>Author: {this.state.story.author}</p>
            {/* <p>Rating: { this.state.book.rating }</p> */}
            <p>Content: {this.state.story.content}</p>
            <hr></hr>
            {this.state.story.reviews.map(review => (
              <Review reviewer={review.reviewer} comment={review.comment} score={review.score}></Review>
            ))}
            {
              this.props.user && this.props.user.username !== this.state.story.author &&
            <AddReview username={this.props.user.username} storyID={this.state.story.id}/>
            }
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
