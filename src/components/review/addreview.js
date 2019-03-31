import React, { Component } from 'react';
import apiURL from '../../api';

export default class AddReview extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: '',
      score: 5,
      sent: false
    }
    this.onCommentChange = this.onCommentChange.bind(this);
    this.sendReview = this.sendReview.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  onScoreChange = (e) => {
    e.preventDefault();
    this.setState({ score: e.target.value})
  }

  onCommentChange = (e) => {
    e.preventDefault();
    this.setState({comment: e.target.value})
  }

  sendReview = (e) => {
    e.preventDefault();
    console.log(`${this.props.username} ${this.props.storyID} ${this.state.comment} ${this.state.score}`)
    fetch(`${apiURL}/api/review/${this.props.storyID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: this.state.comment,
        score: this.state.score,
        reviewer: this.props.username
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          console.log('Error');
          break;
      }
      return;
    })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.comment} onChange={this.onCommentChange}></textarea>
        <button disabled={this.state.disabled} onClick={this.sendReview}>Add</button>
        <select value={this.state.score} onChange={this.onScoreChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    )
  }
}