import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from '../review/review';
import AddReview from '../review/addreview';
import Stars from '../bookshelf/stars';
import apiURL from '../../api';
import marked from 'marked';

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
          data.story.score = this.getAverageScore(data.story.reviews);
          data.story.id = id;
          this.setState({ story: data.story })
        }
      })
  }

  getAverageScore(reviews){
    let sum = 0
    reviews.forEach(review => {
      sum += review.score
    });
    return (sum) ? (sum / reviews.length).toFixed(2): sum;
  }

  alreadyReviewed(reviews, username){
    let reviewed = false;
    reviews.forEach(review => {
      if(review.reviewer === username){
        reviewed = true;
      }
    });
    return reviewed;
  }

  getMarkdownText() {
    let markUp = marked(this.state.story.content, {sanitize: true});
    return {__html: markUp};
  }

  render() {
    return (
      <React.Fragment>
        {(!this.state.story) ?
          <h4>Story is loading</h4> :
          <div>
            <h1>{this.state.story.title}</h1>
            <br/>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <h5>By: <b>{this.state.story.author}</b></h5>
              {
                this.state.story.score !== 0 &&
                <Stars score={this.state.story.score} style={{fontSize: '1.2em'}} />
              }
            </div>
            <br/>
            <div className="main-panel-container">
              <div dangerouslySetInnerHTML={this.getMarkdownText()}>
              </div>
            </div>
            <hr></hr>
            <div className="main-panel-container">
              <header>Reviews</header>
              {this.state.story.reviews.map(review => (
                <div key={`${review.reviewer}-${review.comment}`}>
                  <hr></hr>
                  <Review  reviewer={review.reviewer} comment={review.comment} score={review.score}></Review>
                </div>
              ))}
            </div>
            <br/>
            {
              this.props.user && this.props.user.username !== this.state.story.author &&
              !this.alreadyReviewed(this.state.story.reviews, this.props.user.username) &&
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
